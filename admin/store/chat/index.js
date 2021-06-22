const moduleChat = {
    namespaced: true,
    state: () => ({
        senderID: "",
        recieverID: "",
        recieverName: "",
        recieverAva: "",
        messageList: [],
        isOpen: false
    }),
    mutations: {
        insertNewMessage(state, newMessage) {
            state.messageList.push(newMessage)
        },
        setSenderID(state, id) {
            state.senderID = id
        },
        setReciver(state, { id, name, avatar }) {
            state.recieverId = id
            state.recieverName = name
            state.recieverAva = avatar
        },
        setMessageList(state, messageList) {
            state.messageList = messageList
        },
        openChat(state) {
            state.isOpen = true
        },
        closeChat(state) {
            state.isOpen = false
        }
    },
    actions: {

    },
    getters: {
        getReciever(state) {
            return {
                id: state.recieverId,
                name: state.recieverName,
                avatar: state.recieverAva
            }
        }
    }
}

export default moduleChat