import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import styles from './index.module.scss'
import cx from 'classnames'
import Message from './Message'
import { getChatRooms } from '../../api'
import * as socketio from "../../utils/socket-io"

const ChatDropdown = () => {
    const [rooms, setRooms] = useState([])
    const senderID = useSelector(state => state.chat.senderID)
    const messageList = useSelector(state => state.chat.messageList)
    const isOpen = useSelector(state => state.chat.isOpen)
    const [unreadMount, setUnreadMount] = useState(0)

    socketio.addEventListener({
        type: `create_new_room_${senderID}`,
        callback: async data => {
            console.log('create room: ', data)
            await getDataChatRooms()
        }
    })

    const getUnreadMount = () => {
        const newUnreadMount = rooms.reduce((previousValue, message) => {
            return previousValue += !message.is_read ? 1 : 0
        }, 0)
        setUnreadMount(newUnreadMount)
    }

    const getDataChatRooms = async () => {
        const result = await getChatRooms({ userId: senderID })
        const data = await result.json()
        data.map(room => {
            if(room.latest_message.author == senderID || isOpen) {
                room.is_read = true
            }
            return room
        })
        data.sort((a, b) => {
            return new Date(b.latest_update) - new Date(a.latest_update);
        })
        setRooms(data)
    }

    useEffect(() => {
        if(senderID) {
            getDataChatRooms()
        }
    }, [senderID]) 

    useEffect(() => {
        getDataChatRooms()
    },[messageList])

    useEffect(() => {
        if(rooms.length != 0) {
            getUnreadMount()
        }
    }, [rooms]) 

    return(
        <React.Fragment>
            <a className="chatDropdown_active" href="#">
                <span className={styles.chatIcon}>
                    <i className="zmdi zmdi-hc-2x zmdi-email"></i>
                </span>
                {unreadMount == 0 ? <></> : <span className="product_qun">{unreadMount}</span>}
            </a>
            <div className="block-miniChat miniChatDropdown__active">
                <div className="minicart-content-wrapper">
                <div className={cx("single__items", styles.chatDropdownSingleItems)}>
                    <div className="miniproduct">
                        {
                            rooms.map((room, index) => {
                                const userId = room.members.find(member => member != senderID)
                                const isRead = room.is_read
                                const content = room.latest_message.data.text
                                const _datetime = new Date(room.latest_update)
                                const date = `${_datetime.toTimeString().slice(0, 5)} - ${_datetime.getDate()}.${_datetime.getMonth()}.${_datetime.getFullYear()}`
                                return(
                                    <Message 
                                        key={`dropdown_message_${index}`} 
                                        userId={userId} isRead={isRead} 
                                        content={content} date={date}
                                    />
                                )
                            })
                        }
                        <Message />
                        <Message />
                    </div>
                </div>
                <div className="mini_action cart">
                    <a className="cart__btn" href="cart.html">View and edit cart</a>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatDropdown