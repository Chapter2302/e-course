const User = require('../model/user')
const Transaction = require('../model/transaction')
const Course = require('../model/course')

const userExist = async (email) => {
    return await User.exists({"authenticateMethod.local.email": email})
}

const getAllUsers = async session => {
    return session ? await User.find({}).session(session) : await User.find({})
}

const getUser = async (uid, session) => {
    return session ? await User.findOne({ '_id': uid }).session(session) : await User.findOne({ '_id': uid }) 
}

const getUserHistoryTransaction = async (uid) => {
    const trans = await Transaction.find({user: uid})
    const data = await Promise.all(trans.map(async tran => {
        const course = await Course.findOne({_id: tran.course})
        const item = {...course._doc, status: tran.status, transactionDate: tran.date}
        return item
    }))
    return data
}

const createUser = async (data, session) => {
    return session 
    ? await User.create([ data ], { session: session })
    : await User.create([ data ])
}

const updateUser = async (data, session) => {
    return session 
    ? await User.updateOne({ _id: data._id }, { $set: data }).session(session) 
    : await User.updateOne({ _id: data._id }, { $set: data })
}

const deleteUser = async (uid, session) => {
    return session 
    ? await User.findByIdAndDelete(uid).session(session) 
    : await User.findByIdAndDelete(uid)
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