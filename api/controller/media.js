const Media = require('../model/media')

const getAllMedia = async (user) => {
        return await Media.find({})
}

const getMedia = async (mid) => {
    return await Media.findOne({ "_id": mid })
}

const createMedia = async (data) => {
    return await Media.create([ data ])
}

const updateMedia = async (data) => {
    await Media.updateOne({ _id: data._id }, { $set: data })
    return await Media.findOne({ _id: data._id })
}

const deleteMedia = async (mid) => {
    return await Media.findOneAndDelete({ _id: mid })
}

module.exports = { 
    getAllMedia, 
    getMedia, 
    createMedia, 
    updateMedia, 
    deleteMedia 
}  