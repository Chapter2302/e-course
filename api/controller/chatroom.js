const ChatRoom = require('../model/room')

const getAllChatRoom = async () => {
    return await ChatRoom.find({})
}

const getChatRoomById = async (uid) => {
    const chatRooms = await getAllChatRoom()
    const result = chatRooms.filter(cr => {
        return cr.members.includes(uid) && cr.messages.length != 0
    }).map(cr => {
        return {
            members: cr.members,
            latest_message: cr.messages[cr.messages.length - 1],
            is_read: cr.is_read,
            latest_update: cr.latest_update
        }
    })
    return result
}

const getChatRoom = async (user1, user2) => {
    const chatRooms = await getAllChatRoom()
    const result = chatRooms.filter(cr => {
        return cr.members.includes(user1) && cr.members.includes(user2)
    })
    return result[0]
}

const createChatRoom = async (data) => {
    const result = await ChatRoom.create([ data ])
    return result[0]
}

const updateChatRoom = async (data) => {
    await ChatRoom.updateOne({ _id: data._id }, { $set: data })
    return await ChatRoom.findOne({ _id: data._id })
}

const deleteChatRoom = async (mid) => {
    return await ChatRoom.findOneAndDelete({ _id: mid })
}

module.exports = { 
    getAllChatRoom,
    getChatRoomById, 
    getChatRoom, 
    createChatRoom, 
    updateChatRoom, 
    deleteChatRoom 
}  