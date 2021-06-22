const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {type:String},
    start_date: {type: String},
    end_date: {type: String},
    rating: {type: Number},
    description: {type: String},
    category: {type:String},
    price: {type:Number},
    featured_image: {type:String},
    teacher: {type: String, ref:'user'},
    content: {type: Array},
    quantity: {type: Number},
    is_active: {type: Boolean, default: false}
})

module.exports = mongoose.model('course',courseSchema)