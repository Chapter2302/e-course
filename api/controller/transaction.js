const Transaction = require('../model/transaction')

const getAllTransactions = async (session) => {
    return session ? await Transaction.find({}).session(session) : await Transaction.find({})
}

const getTransaction = async (tid, session) => {
    return session ? await Transaction.findOne({ '_id': tid }).session(session) : await Transaction.find({ '_id': tid })
}

const getTransactionByCondition = async (condition) => {
    return session ? await Transaction.find(condition).session(session) : await Transaction.find(condition)
} 

const createTransaction = async (data, session) => {
    return session 
    ? await Transaction.create([ data ], { session: session })
    : await Transaction.create([ data ])
}

const updateTransaction = async (data, session) => {
    return session 
    ? await Transaction.updateOne({user: data.user, course: data.course} || {_id: data.id}, { $set: data }).session(session)
    : await Transaction.updateOne({user: data.user, course: data.course} || {_id: data.id}, { $set: data })
}

const deleteTransaction = async (tid, session) => {
    return session ? Transaction.findByIdAndDelete(tid).session(session) : Transaction.findByIdAndDelete(tid)
}

module.exports = { 
    createTransaction,
    getAllTransactions, 
    getTransaction,
    getTransactionByCondition, 
    updateTransaction,
    deleteTransaction 
}