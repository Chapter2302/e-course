import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import { getUser } from "../../../api"
import { setIsOpen, setReciever } from "../../../store/chat"
import { useDispatch, useSelector } from 'react-redux'
import * as socketio from "../../../utils/socket-io"

const Message = (props) => {
    const dispatch = useDispatch()
    const { userId, content, isRead, date } = props
    const [user, setUser] = useState(null)
    const senderID = useSelector(state => state.chat.senderID)

    const getUserData = async () => {
        const result = await getUser({ id: userId })
        const data = await result.json()
        setUser(data)
    }

    const onMessageClick = () => {
        dispatch(setReciever({ 
            id: user._id, 
            name: user.full_name, 
            avatar: user.avatar
        }))

        dispatch(setIsOpen({ isOpen: true }))
    } 

    useEffect(() => {
        getUserData()
    }, [])

    return(
        !user ? <React.Fragment></React.Fragment>
        : <div onClick={onMessageClick} className={cx(styles.messageContainer, 'item01', 'miniChatDropdown__close')}>
            <div className={styles.messageWrapper}>
                <div className="thumb">
                    <img className={styles.messageAvatarImage} src={user.avatar} alt="product images" />
                </div>
                <div className="content d-flex flex-column justify-content-between">
                    <span className="prize">{user.full_name}</span>
                    <div className={cx(styles.messageContent, {[styles.isUnread]: !isRead})}>
                        {content}
                    </div>
                    <div className="product_prize d-flex justify-content-between">
                        <span className="qun">{date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message