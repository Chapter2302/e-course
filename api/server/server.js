const express     = require('express')
const app         = express()
const http        = require('http').Server(app);
const User        = require('../model/user')
const Course      = require('../model/course')
const Transaction = require('../model/transaction')
const notiService = require('../util.js/noti-service')

require('dotenv').config()

const port     = process.env.PORT || 4000
const mongoose = require('mongoose')
const passport = require('../config/passport')
const authRoute = require('../api/route/auth')
const courseRoute = require('../api/route/course')
const userRoute = require('../api/route/user')
const transRoute = require('../api/route/transaction')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const session      = require('express-session')
const cors = require('cors');
const { use } = require('../config/passport');

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('DB Connected!')) // connect tới database 
// Cấu hình ứng dụng express
app.use(cors())

app.use(cookieParser()) //Parse cookie
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session({
//   name: "session",
//   secret: 'secret',
//   cookie: { maxAge: 60000 },
//   resave: false, 
//   saveUninitialized: false
// }))

app.use(passport.initialize())
//app.use(passport.session())

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({
//       authenticated: false,
//       message: "user has not been authenticated"
//     })
//   } else {
//     next();
//   }
// }

// const checkRole = (roles = []) => {
//   return async (req, res, next) => {
//     let check = await roles.some(role => {
//       return req.user.role.includes(role)
//     })
//     if (check) res.json('ACCESS GRANTED')
//     else res.json('ACCESS DENIED') 
//   }
// }

// app.get("/", checkRole(['teacher']), (req, res) => {
//   res.status(200).json({
//     authenticated: true,
//     message: "user successfully authenticated",
//     user: req.user,
//     cookies: req.cookies
//   })
// })

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/course', courseRoute)
app.use('/trans', transRoute)

setInterval(async () => { 
    const today = new Date();
    const dayMapping = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

    const doSendMail = async shift => {
        const condition = {
            'isActive': true,
            'schedule.shift': shift,
            'schedule.dayInWeek': dayMapping[today.getDay()]
        }
    
        const courses = await Course.find(condition)
    
        courses.forEach(async course => {
            const teacher = await User.findOne({_id: course.teacher})
            notiService.sendMail(teacher, course)
            const transactions = await Transaction.find({course: course._id})
    
            transactions.map(async tran => {
                const user = await User.findOne({_id: tran.user})
                notiService.sendMail(user, course)
            })
        })
    }
    // const u = {
    //     role: "student",
    //     authenticateMethod: { 
    //         local: {
    //             email: "tranhanam1999hn@gmail.com"
    //         }
    //     }
    // }
    // const c = {
    //     name: "Web Programming",
    //     link: "https://meet.google.com/pzc-rokm-qjb"
    // }
    // notiService.sendMail(u, c)

    if(today.getHours() === 6 && today.getMinutes() === 30) {
        doSendMail(1)
    } else if (today.getHours() === 13 && today.getMinutes() === 30) {
        doSendMail(2)
    } else if (today.getHours() === 18 && today.getMinutes() === 30) {
        doSendMail(3)
    }
}, 2000)

io.on('connection', (socket) => {
    console.log('a user connected ');

    socket.on('joinRoom', data => {
        console.log('join: ', data, socket.id)
        if(data.userID) 
            socket.join(data.userID)
        if(data.recieverID) 
            socket.join(data.recieverID)
    })

    socket.on('message', data => {
        console.log('message: ', data)
        socket.to(data.recieverID).emit('message', { message: data.message, senderName: data.userName, senderID: data.userID, senderPhoto: data.userPhoto })
    })

    socket.on('disconnect', reason => {
        console.log('deleted: ', socket.id)
    })
});

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})