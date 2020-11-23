const express = require('express')
const router = express.Router()
const passport = require('passport')
const Transaction = require("../../model/transaction")
const {getUser} = require("../../controller/user") 

const { 
    createCourse, 
    getAllCourses, 
    getCoursesByUid,
    getCourse, 
    updateCourse, 
    deleteCourse
} = require('../../controller/course')

router.post('/add', async (req,res) => {
    try {
        await createCourse(req.body)
        res.json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/get-all-guess', async (req, res) => {
    try {
        const data = await getAllCourses({role: "user"})
        res.status(200).json(data)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/get-all', passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const data = await getAllCourses(req.user)
        res.status(200).json(data)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/get/:id', async (req,res) => {
    try {
        const course = await getCourse(req.params.id)
        const trans = await Transaction.find({course: req.params.id, status: "SUCCESS"})
        const reviews = await Promise.all(trans.map(async tran => {
            const user = await getUser(tran.user)
            return {
                fullName: user.fullName,
                photoUser: user.photoUser,
                review: tran.review,
                rating: tran.rating
            }
        }))
        const data = {
            course,
            reviews
        }
        res.status(200).json(data)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get("/get-by-uid/:uid", async (req, res) => {
    try {
        const data = await getCoursesByUid(req.params.uid)
        res.status(200).json(data)
    }
    catch(err) {
        console.log(err)
        res.status(404).json("Fail")
    }
})

router.put('/update', async (req,res) => {
    try {
        await updateCourse(req.body)
        res.status(200).json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.delete('/delete', async (req,res) => {
    try {
        await deleteCourse(req.body.id)
        res.status(200).json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

module.exports = router;