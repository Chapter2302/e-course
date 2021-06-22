const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({
    created_date: {type: String},
    name: {type: String},
    url: {type: String},
    type: {type:String},
})

module.exports = mongoose.model('media',mediaSchema)