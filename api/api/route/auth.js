const express                 = require("express")
const router                  = express.Router()
const passport                = require("passport")
const jwt                     = require("jsonwebtoken")
const {sendMail}              = require("../../util.js/mailer")
const {userExist, getUser, createUser} = require("../../controller/user")

let newAccount = {}

module.exports = (function() {
  router.get("/login/success", (req, res) => {
    console.log('req.user: ', req.user)
    if(req.user)
      res.status(200).json(req.user)
    else
      res.status(404).json('Fail')
  })

  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    })
  })

  router.post('/local', passport.authenticate('local-login', {session: false}),
    (req, res) => {
      if(req.user) {
        const data = {
          id: req.user._id,
          fullName: req.user.full_name,
          role: req.user.role,
          photoUser: req.user.avatar,
          token: jwt.sign({id: req.user._id}, 'Secret')
        }
        res.status(200).json(data)
      }
      else 
        res.status(400)
    }
  )
  
  router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }))

  router.get(
    "/google/redirect",
    passport.authenticate("google", {session: false}),
    (req, res) => {
      if(req.user){
        const data = {
          id: req.user._id,
          fullName: req.user.full_name,
          role: req.user.role,
          photoUser: req.user.avatar,
          token: jwt.sign({id: req.user._id}, 'Secret')
        }
        res.cookie("session", JSON.stringify(data), {maxAge: 1000*60*60*24})
        res.redirect("http://localhost:3000/home")
      }
      else 
        res.status(400)
    }
  )

  router.post("/is-user-exist", async (req, res) => {
    const email = req.body.local_email
    const result = await userExist(email)
    if(result) {
      res.status(404).json("Email Existed")
    }
    else {
      try {
        newAccount = req.body
        const data = await sendMail(email, "[ECourse] Validate Your Email")
        if(data) {
          res.status(200).send()
        } else {
          res.status(404).json("Cannot Send Mail")
        }
      }
      catch(err) {
        res.status(404).json("Unknown")
      }
    }
  })

  router.get("/register", async (req, res) => {
    try {
      const user = await createUser(newAccount)
      res.redirect("http://localhost:3000/account/login")
    }
    catch {
      res.status(400)
    }
  })

  router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user) {
      res.status(200).json(req.user)
    }
    else 
      res.status(400)
  })

  router.get('/check/:id', async (req, res) => {
    const user = await getUser(req.params.id)
    
    if(user) {
      const data = {
        id: user._id,
        fullName: user.full_name,
        role: user.role,
        photoUser: user.avatar,
        token: jwt.sign({id: user._id}, 'Secret')
      }
      res.status(200).json(data)
    }
    else 
      res.status(404)
  })
    

  return router    
})()
