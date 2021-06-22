const Transaction = require('../model/transaction')
const User = require('../model/user')
const Course = require('../model/course')

const getAllTransactions = async () => {
    return await Transaction.find({})
}

const getTransaction = async (tid) => {
    return await Transaction.find({ '_id': tid })
}

const getTransactionByCondition = async (condition) => {
    return await Transaction.find(condition)
} 

const createTransaction = async (data) => {
    try {
        const { userId, courseId } = data
        const student = await User.findOne({ '_id': userId }) 
        const studentTransaction = await Transaction.find({"user": userId, "status": "success"})
        const course = await Course.findOne({ '_id': courseId })
        const teacher = await User.findOne({ '_id': course.teacher })
        
        const isOwned = studentTransaction.some(trans => trans.course == courseId && trans.status == "success")

        const newTransaction = {
            user: userId, 
            course: courseId, 
            date: new Date().toISOString()
        }

        if(isOwned) {
            newTransaction.status = 'fail'
            // await Transaction.create([ newTransaction ])

            return {
                status: 'fail',
                type: 'danger',
                message: 'This Course Is Registed'
            }
        } 

        if (student.balance < course.price) {
            newTransaction.status = 'fail'
            // await Transaction.create([ newTransaction ])

            return {
                status: 'fail',
                type: 'danger',
                message: `Not Enough Money In Balance`
            }
        } 
        newTransaction.status = 'success'
        
        // await Transaction.create([ newTransaction ])

        // student.balance = student.balance - course.price
        // teacher.balance = teacher.balance + course.price

        // await student.save()
        // await teacher.save()

        return {
            status: 'success',
            type: 'success',
            message: `Buy Successfully`
        }
    } catch(err) {
        console.log(err)
    }
}

const updateTransaction = async (data) => {
    await Transaction.updateOne({_id: data._id}, { $set: data })
    return await Transaction.findOne({ _id: data._id }) 
}

const deleteTransaction = async (tid) => {
    return await Transaction.findByIdAndDelete(tid)
}

module.exports = { 
    createTransaction,
    getAllTransactions, 
    getTransaction,
    getTransactionByCondition, 
    updateTransaction,
    deleteTransaction 
}