const express = require('express')
const router = express.Router()
const db = require('mongoose')
const { getAllTransactions, 
        getTransaction, 
        getTransactionByCondition,
        createTransaction, 
        updateTransaction, 
        deleteTransaction } = require('../../controller/transaction')


router.get('/get-all', async (req, res) => {
    try {
        let data = await getAllTransactions()
        res.status(200).json(data)
    } catch {
        res.status(404)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let data = await getTransaction(req.params.id)
        res.status(200).json(data)
    } catch {
        res.status(404)
    }
})

router.get('/get-by-conditions/', async (req, res) => {
    try {
        let data = await getTransactionByCondition(req.body)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.post('/', async (req, res) => {
    try {
        const data = await createTransaction(req.body)
        res.status(200).json(data)
    } catch(err) {
        res.status(404)
    }
})

router.put('/', async (req, res) => {
    try {
        const data = await updateTransaction({ ...req.body })
        res.status(200).json(data)
    } catch(err) {
        res.status(404)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const data = await deleteTransaction(req.params.id)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

module.exports = router