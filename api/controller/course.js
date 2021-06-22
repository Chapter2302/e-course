const Course = require('../model/course')
const Transaction = require("../model/transaction")

const getAllCourses = async (user) => {
    if(user.role == "teacher")
        return await Course.find({ "teacher": user.id })
    else 
        return await Course.find({})
}

const getCourse = async (cid) => {
    return await Course.findOne({ "_id": cid })
}

const getCoursesByUid = async (uid) => {
    const trans = await Transaction.find({"user": uid, "status": "success"})
    const courses = Promise.all(trans.map(async tran => {
        const course = await Course.findOne({"_id": tran.course})
        return course
    }))
    return courses
}

const createCourse = async (data) => {
    return await Course.create([ data ])
}

const updateCourse = async (data) => {
    await Course.updateOne({ _id: data._id }, { $set: data })
    return await Course.findOne({ _id: data._id })
}

const deleteCourse = async (cid) => {
    return await Course.findByIdAndDelete(cid)
}

module.exports = { 
    getAllCourses, 
    getCourse, 
    getCoursesByUid,
    createCourse, 
    updateCourse, 
    deleteCourse 
}  