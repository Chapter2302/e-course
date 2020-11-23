const Course = require('../model/course')
const Transaction = require("../model/transaction")

const getAllCourses = async (user, session) => {
    if(user.role == "teacher")
        return session 
        ? await Course.find({ "teacher": user.id }).session(session)
        : await Course.find({ "teacher": user.id })
    else 
        return session
        ? await Course.find({}).session(session)
        : await Course.find({})
}

const getCourse = async (cid, session) => {
    return session ? await Course.findOne({ "_id": cid }).session(session) : await Course.findOne({ "_id": cid })
}

const getCoursesByUid = async (uid) => {
    const trans = await Transaction.find({"user": uid, "status": "SUCCESS"})
    const courses = Promise.all(trans.map(async tran => {
        const course = await Course.findOne({"_id": tran.course})
        return course
    }))
    return courses
}

const createCourse = async (data, session) => {
    return session 
    ? await Course.create([ data ], { session: session })
    : await Course.create([ data ])
}

const updateCourse = async (data, session) => {
    return session 
    ? await Course.updateOne({ _id: data._id }, { $set: data }).session(session) 
    : await Course.updateOne({ _id: data._id }, { $set: data })
}

const deleteCourse = async (cid, session) => {
    return session ? await Course.findByIdAndDelete(cid).session(session) : await Course.findByIdAndDelete(cid)
}

module.exports = { 
    getAllCourses, 
    getCourse, 
    getCoursesByUid,
    createCourse, 
    updateCourse, 
    deleteCourse 
}  