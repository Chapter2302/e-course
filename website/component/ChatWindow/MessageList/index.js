import React from "react"
import {useSelector} from "react-redux"
import Message from "../Message"

const MessageList = () => {
    const messageList = useSelector(state => state.chat.messageList)

    return (
        <React.Fragment>
            {
                messageList.map((message, index) => {
                    return(
                        <Message key={`window_message_${index}`} user={message.author} content={message.data.text}/>
                    )
                })
            }
        </React.Fragment>
    )
}

export default MessageList

