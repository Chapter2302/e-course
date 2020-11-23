const express = require('express')
const router = express.Router()
const db = require('mongoose')
const Transaction = require('../../model/transaction')
const User = require('../../model/user')
const Course = require('../../model/course')
const { getCourse, updateCourse } = require('../../controller/course')
const { getUser, updateUser } = require('../../controller/user')
const { getAllTransactions, 
        getTransaction, 
        getTransactionByCondition,
        createTransaction, 
        updateTransaction, 
        deleteTransaction } = require('../../controller/transaction')


router.get('/get-all', async (req, res) => {
    let data = await getAllTransactions()
    res.json(data)
})

router.get('/get/:id', async (req, res) => {
    let data = await getTransaction(req.params.id)
    res.json(data)
})

router.get('/get-by-conditions/', async (req, res) => {
    const condition = req.body
    try {
        let data = await getTransactionByCondition(condition)
        res.json(data)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.post('/add', async (req, res) => {
    try {
        const newTrans = req.body
        let transactions = []
        let total = 0
        const session = await db.startSession()
        await session.startTransaction()
        await newTrans.cids.reduce(async (preTrans, cid) => {
            await preTrans
            const course = await getCourse(cid, session)
            const user = await getUser(newTrans.user, session)
            let trans = new Transaction()
            if (course.quantity == course.maxStudent) { 
                trans = await createTransaction({ 
                    user: newTrans.user, 
                    course: cid, 
                    date: newTrans.date,
                    status: 'FAIL' 
                }, session)
                transactions.push(trans)
                return trans
            }
            else {
                console.log("total: ", total, "user.balance: ", user.balance)
                if((total + course.price) <= user.balance)
                {
                    trans = await createTransaction({ 
                        user: newTrans.user, 
                        course: cid, 
                        date: newTrans.date,
                        status: 'SUCCESS' 
                    }, session)
                    let newCourse = {
                        _id: course._id,
                        quantity: course.quantity + 1,
                        isActive: (course.quantity + 1 == course.maxStudent) ? false : true
                    }
                    let newUser = {
                        _id: user.id,
                        balance: user.balance - course.price
                    }
                    await updateUser(newUser, session)
                    await updateCourse(newCourse, session)
                    total = total + course.price
                    transactions.push(trans)
                    return trans
                } 
                else {
                    trans = await createTransaction({ 
                        user: newTrans.user, 
                        course: cid, 
                        date: newTrans.date,
                        status: 'PENDING' 
                    }, session)
                    transactions.push(trans)
                    return trans
                }
            }
        }, Promise.resolve())

        await session.commitTransaction()
        await session.endSession()
        res.status(200).json(transactions)
    }
    catch(e) {
        console.log("Loi ne: ", e)
        res.status(404).json("Fail")
    }
})

router.put('/update', async (req, res) => {
    try {
        const session = await db.startSession()
        session.startTransaction()
        let course = await getCourse(req.body.course, session)
        let message = await updateTransaction(req.body , session)
        switch(req.body.status) {
            case 'SUCCESS':
                if(course.quantity < course.maxStudent)
                {
                    let newCourse = {
                        _id: course._id,
                        quantity: course.quantity + 1,
                        isActive: (course.quantity + 1 == course.maxStudent) ? false : true
                    }
                    let newUser = {
                        _id: user.id,
                        balance: user.balance - course.price
                    }
                    if(req.body.rating) newCourse.rating = (req.body.rating + course.rating)/2
                    await updateUser(newUser, session)
                    await updateCourse(newCourse, session)
                }
                break
            default: break
        }
        await session.commitTransaction()
        session.endSession()
        res.status(200).json(message)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.delete('/delete', async (req, res) => {
    try {
        await deleteTransaction(req.body.id)
        res.status(200).json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/add-test', async (req, res) => {
    let user = { _id: '5f3bcad317c87f2d888a5601', fullName: 'Erhart Coltan', balance: 85 }
    let cids = ['5f3bca3d17c87f2d888a55e3', '5f3bca3d17c87f2d888a55e4', '5f3bca3d17c87f2d888a55e5']
    let transactions = []
    const session = await db.startSession()
    session.startTransaction()
    await cids.reduce(async (currVal, cid) => { 
        let course = await getCourse(cid, session)
        
        let trans = new Transaction()
        if (course.quantity == course.maxStudent) { 
            trans = await Transaction.create([{ user: user, course: course, status: 'FAIL' }], { session: session })
            transactions.push({trans: trans, message: 'FULL'})
        }
        else {
            if((currVal + course.price) <= user.balance)
            {
                trans = await Transaction.create([{ user: user, course: course, status: 'SUCCESS' }], { session: session });
                await updateCourse(course, newCourse => {
                    newCourse.quantity += 1
                    newCourse.isActive = (newCourse.quantity == newCourse.maxStudent) ? false : true
                })
                await transactions.push({trans: trans, message: ''})
                return currVal + course.price
            } 
            else {
                trans = await Transaction.create([{ user: user, course: course, status: 'PENDING' }], { session: session })
                transactions.push({trans: trans, message: 'BALANCE PROBLEM'})
            }
        }
    }, 0)

    await session.commitTransaction()
    session.endSession()
    await console.log(transactions)
    await res.json(transactions)
})

module.exports = router