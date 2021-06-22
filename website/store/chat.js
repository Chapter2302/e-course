import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    senderID: "",
    recieverID: "",
    recieverName: "",
    recieverAva: "",
    messageList: [
        // {
        //     author: '608628d4d778a11af4fc5a2e',
        //     type: 'text',
        //     data: { text: 'Hello!' }
        // },
        // {
        //     author: '608628d4d778a11af4fc5a23',
        //     type: 'text',
        //     data: { text: 'I just want to say that Im testing now so you dont mind!' }
        // }
    ],
    isOpen: false
}

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSender: (state, action) => {
        const { senderID } = action.payload
        state.senderID = senderID
    },
    setReciever: (state, action) => {
        const { id, name, avatar } = action.payload
        state.recieverID = id
        state.recieverName = name
        state.recieverAva = avatar
    },
    setIsOpen: (state, action) => {
        const { isOpen } = action.payload
        state.isOpen = isOpen 
    },
    setMessageList: (state, action) => {
        const { messageList } = action.payload
        state.messageList = messageList
    },
    addNewMessage: (state, action) => {
        const { newMessage } = action.payload
        state.messageList.push(newMessage)
    }
  }
})

export const { 
    setSender,
    setReciever,
    setIsOpen,
    setMessageList,
    addNewMessage
 } = slice.actions

export default slice.reducer