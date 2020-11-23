const express                 = require("express")
const router                  = express.Router()
const passport                = require("passport")
const jwt                     = require("jsonwebtoken")
const {sendMail}              = require("../../util.js/mailer")
const {userExist, createUser} = require("../../controller/user")

let newAccount = {}

module.exports = (function() {
  router.get("/login/success", (req, res) => {
    console.log('req.user: ', req.user)
    res.status(200).json(req.user)
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
          fullName: req.user.fullName,
          role: req.user.role,
          photoUser: req.user.photoUser,
          token: jwt.sign({id: req.user._id}, 'Secret')
        }
        res.status(200).json(data)
      }
      else 
        res.status(400)
    }
  )

  router.get('/facebook',passport.authenticate('facebook', { scope:'email' }))
  
  router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }))

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {session: false}),
    (req, res) => {
      if(req.user) {
        const data = {
          id: req.user._id,
          fullName: req.user.fullName,
          role: req.user.role,
          photoUser: req.user.photoUser,
          token: jwt.sign({id: req.user._id}, 'Secret')
        }
        res.cookie("session", JSON.stringify(data), {maxAge: 1000*60*60*24})
        res.redirect("http://localhost:3000/home")
      }
      else 
        res.status(400)
    }
  )

  router.get(
    "/google/redirect",
    passport.authenticate("google", {session: false}),
    (req, res) => {
      if(req.user){
        const data = {
          id: req.user._id,
          fullName: req.user.fullName,
          role: req.user.role,
          photoUser: req.user.photoUser,
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
    const email = req.body.authenticateMethod.local.email
    const result = await await userExist(email)
    if(result) {
      res.status(400).json()
    }
    else {
      try {
        newAccount = req.body
        await sendMail(email, "[OnlineCourse] Validate Your Email")
        res.status(200).json()
      }
      catch(err) {
        res.status(400).json()
      }
    }
  })

  router.get("/register", async (req, res) => {
    try {
      const user = await createUser(newAccount)
      res.redirect("http://localhost:3000/account/login")
    }
    catch {
      res.status(400).json()
    }
  })

  router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user) {
      res.status(200).json(req.user)
    }
    else 
      res.status(400)
  })

  router.get('/check', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('user: ', req.user)
    if(req.user) {
      const data = {
        id: req.user._id,
        fullName: req.user.fullName,
        role: req.user.role,
        photoUser: req.user.photoUser,
        token: jwt.sign({id: req.user._id}, 'Secret')
      }
      res.status(200).json(data)
    }
    else 
      res.status(400)
  })
    

  return router    
})()
