const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {type: String},
    bio: {type: String},
    role: {type: String, enum: ['student','teacher','admin']},
    address: {type: String},
    sex: {type: String, enum: ['Male','Female']},
    birthday: {type: String},
    photoUser: {type: String},
    authenticateMethod: {
        local: {
            email: {type:String, unique: true},
            password: {type:String},
        },
        facebook: {
            name: {type:String},
            id: {type:String, unique: true}
        },
        google: {
            email : {type:String},
            name: {type:String},
            id: {type:String, unique: true}
        }    
    },
    workPlace: {type: String},
    rating: {type: Number},
    bankId: {type: String},
    phoneNumber: {type: String},
    balance: {type: Number}
})

module.exports = mongoose.model('user', userSchema)