const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    messages: {type: Array},
    members: {type: Array},
    latest_update: {type: String},
    is_read: {type: Boolean}
})

module.exports = mongoose.model('room', roomSchema)