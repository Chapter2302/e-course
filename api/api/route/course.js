const express = require('express')
const router = express.Router()
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

router.post('/', async (req,res) => {
    try {
        const newCourse = await createCourse(req.body)
        res.status(200).json(newCourse)
    }
    catch {
        res.status(404)
    }
})

router.get('/get-all-guess', async (req, res) => {
    try {
        const data = await getAllCourses({role: "user"})
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.get('/get-all-teacher/:id', async (req, res) => {
    try {
        const data = await getAllCourses({id: req.params.id, role: "teacher"})
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.get('/get-all', async (req,res) => {
    try {
        const data = await getAllCourses({role: "admin"})
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const course = await getCourse(req.params.id)
        
        let trans = await Transaction.find({course: req.params.id, status: "success"})
        trans = trans.filter(tran => (tran.review && tran.review != ""))
        const reviews = await Promise.all(trans.map(async tran => {
            const user = await getUser(tran.user)
            return {
                full_name: user.full_name,
                avatar: user.avatar,
                tranId: tran._id,
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
        res.status(404)
    }
})

router.get("/get-by-uid/:uid", async (req, res) => {
    try {
        const data = await getCoursesByUid(req.params.uid)
        res.status(200).json(data)
    }
    catch(err) {
        console.log(err)
        res.status(404)
    }
})

router.put('/', async (req,res) => {
    try {
        const data = await updateCourse(req.body)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const data = await deleteCourse(req.params.id)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

module.exports = router;