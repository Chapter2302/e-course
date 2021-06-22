const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    full_name: {type: String},
    bio: {type: String},
    role: {type: String, enum: ['student','teacher','admin']},
    address: {type: String},
    sex: {type: String, enum: ['male','female']},
    birthday: {type: String},
    avatar: {type: String},
    local_email: {type:String, unique: true},
    local_password: {type:String},
    google_email : {type:String},
    google_name: {type:String},
    google_id: {type:String, unique: true},
    work_place: {type: String},
    rating: {type: Number},
    bank_id: {type: String},
    phone_number: {type: String},
    balance: {type: Number}
})

module.exports = mongoose.model('user', userSchema)