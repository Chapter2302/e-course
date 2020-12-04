const express = require('express')
const router = express.Router()
const passport = require("passport")
const Transaction = require('../../model/transaction')
const Course = require('../../model/course')
const {createUser , getAllUsers, getUser, getUserHistoryTransaction, updateUser, deleteUser} = require('../../controller/user')

router.post('/add', async (req,res) => {
    try {
        const newUser = await createUser(req.body)
        res.status(200).json(newUser)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/get-all', async (req,res) => {
    try {
        let user = await getAllUsers()
        res.status(200).json(user)
    }
    catch {
        res.status(404).json("Fail")
    }
})
router.get('/get/:id', async (req,res) => {
    try {
        let user = await getUser(req.params.id)
        res.status(200).json(user)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.get('/get/history/:id', async (req, res) => {
    try {
        const data = await getUserHistoryTransaction(req.params.id)
        res.status(200).json(data)
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.put('/update', async (req,res) => {
    try {
        await updateUser(req.body)
        res.status(200).json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

router.delete('/delete', async (req, res) => {
    try {
        await deleteUser(req.body.id)
        res.status(200).json("Success")
    }
    catch {
        res.status(404).json("Fail")
    }
})

module.exports = router;