const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
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
          User.findOne({'authenticateMethod.local.email': email}, (err, user) => {
            if(err) done(err)
            if(user) {
              if(user.authenticateMethod.local.password == password) {
                return done(null, user)
              }
              else done(null, false)
            }
            else done(null, false)
          })
        }
    ))

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
    },
    async (token, tokenSecret, profile, done) => {
      User.findOne({'authenticateMethod.facebook.id': profile.id}, async (err, user) => {
        if (err) return done(err)
        if (user) {
            return done(null, user)
        }
        else {
          let newUser = new User({
            fullName: profile.displayName,
            bio: "",
            role: "student",
            address: "",
            sex: profile.gender,
            birthday: "",
            photoUser: profile.photos[0].value,
            authenticateMethod: {
                local: {
                    email: profile.emails[0].value,
                    password: "",
                },
                facebook: {
                    name: profile.displayName,
                    id: profile.id
                },
                google: {
                    email : "",
                    name: "",
                    id: ""
                }    
            },
            workPlace: "",
            rating: "",
            bankId: "",
            phoneNumber: "",
            balance: ""
          })
          await newUser.save()
          User.findOne({'authenticateMethod.facebook.id': profile.id}, (err, user) => {
            if(err) return done(null, false)
            if(user) return done(null, user)
            else return done(null, false)
          })
        }
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
        User.findOne({'authenticateMethod.google.id': profile.id}, async (err, user) => {
          if (err) return done(err)
          if (user) {
            return done(null, user)
          }
          else {
            let newUser = new User({
              fullName: profile.displayName,
              bio: "",
              role: "student",
              address: "",
              sex: profile.gender,
              birthday: "",
              photoUser: profile.photos[0].value,
              authenticateMethod: {
                  local: {
                      email: profile.emails[0].value,
                      password: "",
                  },
                  facebook: {
                      name: "",
                      id: ""
                  },
                  google: {
                      email : profile.emails[0].value,
                      name: profile.username,
                      id: profile.id
                  }    
              },
              workPlace: "",
              rating: "",
              bankId: "",
              phoneNumber: "",
              balance: ""
            })
            await newUser.save()
            User.findOne({'authenticateMethod.google.id': profile.id}, (err, user) => {
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




