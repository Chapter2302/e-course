const passport = require('passport')
const GoogleStratery = require("passport-google-oauth").OAuth2Strategy
const localStrategy = require('passport-local').Strategy
const User = require('../model/user')
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt

require('dotenv').config()
module.exports = (function() {
    // passport.serializeUser((user, done) => {
    //     done(null, user.id)
    // })

    // passport.deserializeUser((id, done) => {
    //   User.findOne({'_id': id}, function (err, user) {
    //     done(err, user)
    //   })
    // })

    // JWT
    passport.use('jwt', new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Secret'
    }, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {        
        if(err) done(err)
        if(user) done(null, user)
        else done(null, false)
      })
    }))

    passport.use('local-login', new localStrategy({
          usernameField: 'email',
          passwordField: 'password'
        },
        (email, password, done) => { 
          User.findOne({'local_email': email}, (err, user) => {
            if(err) done(err)
            if(user) {
              if(user.local_password == password) {
                return done(null, user)
              }
              else done(null, false)
            }
            else done(null, false)
          })
        }
    ))

  passport.use(
    new GoogleStratery(
      {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL:"http://localhost:4000/auth/google/redirect",
        profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
      },
      async (token, tokenSecret, profile, done) => {
        User.findOne({'google_id': profile.id}, async (err, user) => {
          if (err) return done(err)
          if (user) {
            return done(null, user)
          }
          else {
            let newUser = new User({
              full_name: profile.displayName,
              bio: "",
              role: "student",
              address: "",
              sex: "male",
              birthday: "",
              avatar: profile.photos[0].value,
              local_email: profile.emails[0].value,
              local_password: "",
              google_email : profile.emails[0].value,
              google_name: profile.username,
              google_id: profile.id,    
              workPlace: "",
              rating: "",
              bankId: "",
              phone_number: "",
              balance: ""
            })
            await newUser.save()
            User.findOne({'google_id': profile.id}, (err, user) => {
              if(err) return done(null, false)
              return done(null, user)
            })
          }
        })
      }
    )
  )

  return passport
})()




