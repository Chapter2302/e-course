const express = require('express')
const router = express.Router()
const { 
    createChatRoom,
    getChatRoomById,
    updateChatRoom,
    deleteChatRoom
} = require('../../controller/chatroom')

router.post('/', async (req,res) => {
    try {
        const newUser = await createChatRoom(req.body)
        res.status(200).json(newUser)
    }
    catch {
        res.status(404)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const rooms = await getChatRoomById(req.params.id)
        res.status(200).json(rooms)
    }
    catch {
        res.status(404)
    }
})

router.put('/', async (req,res) => {
    try {
        const data = await updateChatRoom(req.body)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await deleteChatRoom(req.params.id)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

module.exports = router;