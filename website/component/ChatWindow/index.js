import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import {useDispatch, useSelector} from "react-redux"
import MessageList from './MessageList'
import { setIsOpen, setMessageList, addNewMessage } from "../../store/chat"
import * as socketio from "../../utils/socket-io"

const ChatWindow = () => {
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = useState("")
    const isOpen = useSelector(state => state.chat.isOpen)
    const senderID = useSelector(state => state.chat.senderID)
    const recieverID = useSelector(state => state.chat.recieverID)
    const recieverName = useSelector(state => state.chat.recieverName)
    const recieverAva = useSelector(state => state.chat.recieverAva)

    const onSendMessageClick = () => {
        const message = {
            author: senderID,
            type: "text",
            data: { text: newMessage }
        }

        socketio.sendEvent({
            type: "send_message",
            data: {
              message: message,
              senderID: senderID, 
              recieverID: recieverID
            }
        })
        dispatch(addNewMessage({ newMessage: message }))
        setNewMessage("")
    }

    const onMessageInputChange = (e) => {
        setNewMessage(e.target.value)
    }

    const onCloseButtonClick = () => {
        dispatch(setIsOpen({ isOpen: false }))
    }

    useEffect(() => {
        if(senderID && senderID != "") {
            socketio.addEventListener({
                type: `recieve_message_list_${senderID}`,
                callback: (data) => {
                  console.log('recieve_message_list ')
                  dispatch(setMessageList({ messageList: data.messageList })) 
                }
            })
            socketio.addEventListener({
                type: `recieve_message_${senderID}`,
                callback: (data) => {
                  console.log('recieve ')
                  dispatch(addNewMessage({ newMessage: data.message }))
                }
            })
        }
    }, [senderID])

    useEffect(() => {
        if(recieverID && recieverID != "") {
            socketio.sendEvent({
                type: "get_message_list",
                data: {
                    senderID: senderID, 
                    recieverID: recieverID
                }
            })
        }
    }, [recieverID])

    return(
        <div className={cx(styles.container, {"d-none": !isOpen})}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <img className={styles.avatar} src={recieverAva}/>
                    <div className={styles.recieverName}>{recieverName}</div>
                    <div className={styles.closeButton} onClick={onCloseButtonClick}>
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                <div className={styles.messageList}>
                    <MessageList />
                </div>
                <div className={styles.messageInput}>
                    <input type="text" className="form-control" value={newMessage} onChange={onMessageInputChange}/>
                    <span className={styles.sendButton} onClick={onSendMessageClick}>
                        <i className="fa fa-paper-plane"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow