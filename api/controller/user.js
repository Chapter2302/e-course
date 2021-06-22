const User = require('../model/user')
const Transaction = require('../model/transaction')
const Course = require('../model/course')

const userExist = async (email) => {
    return await User.exists({"local_email": email})
}

const getAllUsers = async () => {
    return await User.find({})
}

const getUser = async (uid) => {
    return await User.findOne({ '_id': uid }) 
}

const getUserHistoryTransaction = async (uid) => {
    const trans = await Transaction.find({user: uid})
    const data = await Promise.all(trans.map(async tran => {
        const course = await Course.findOne({_id: tran.course})
        const item = {...course, status: tran.status, transactionDate: tran.date}
        return item
    }))
    return data
}

const createUser = async (data) => {
    return await User.create([ data ])
}

const updateUser = async (data) => {
    await User.updateOne({ _id: data._id }, { $set: data })
    return await User.findOne({ _id: data._id })
}

const deleteUser = async (uid) => {
    return await User.findByIdAndDelete(uid)
}

module.exports = { 
    userExist,
    createUser,
    getAllUsers, 
    getUser, 
    getUserHistoryTransaction,
    updateUser,
    deleteUser 
}