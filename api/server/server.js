const express     = require('express')
const app         = express()
const http        = require('http').Server(app)

require('dotenv').config()

const port     = process.env.PORT || 4000
const mongoose = require('mongoose')
const passport = require('../config/passport')
const authRoute = require('../api/route/auth')
const courseRoute = require('../api/route/course')
const userRoute = require('../api/route/user')
const mediaRoute = require('../api/route/media')
const chatRoomRoute = require('../api/route/chatroom')
const transRoute = require('../api/route/transaction')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const cors = require('cors');
const { use } = require('../config/passport')

const {
    createChatRoom,
    getChatRoom,
    updateChatRoom
} = require('../controller/chatroom')

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use('/media-resource', express.static('media-resource'));
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('DB Connected!')) // connect tới database 
app.use(cors())

app.use(cookieParser())

app.use(passport.initialize())

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/media', mediaRoute)
app.use('/course', courseRoute)
app.use('/trans', transRoute)
app.use('/chat-room', chatRoomRoute)

io.on('connection', async socket => {
    // console.log('a user connected ')

    socket.on('get_message_list', async data => {
        console.log('get_message_list')
        let chatRoom = await getChatRoom(data.senderID, data.recieverID)

        if(!chatRoom) {
            chatRoom = await createChatRoom({
                messages: [],
                members: [data.senderID, data.recieverID],
                is_read: true
            })

            io.emit(`create_new_room_${data.senderID}`)
            io.emit(`create_new_room_${data.recieverID}`)
        } else {
            chatRoom.is_read = true
            await updateChatRoom(chatRoom)
        }
        io.emit(`recieve_message_list_${data.senderID}`, { messageList: chatRoom.messages })
    })

    socket.on('send_message', async data => {
        let chatRoom = await getChatRoom(data.senderID, data.recieverID)
        const message = {
            ...data.message,
            author: data.senderID
        }
        chatRoom.messages.push(message)
        chatRoom.latest_update = new Date().toISOString()
        chatRoom.is_read = false

        try {
            await updateChatRoom(chatRoom)
            console.log('send_message')
            io.emit(`recieve_message_${data.recieverID}`, { message: message, senderID: data.senderID })
        } catch(err) {
            console.log(err)
        }
    })

    socket.on('disconnect', reason => {
        console.log('deleted: ', socket.id)
    })
});

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})