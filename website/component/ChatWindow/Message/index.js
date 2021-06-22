import React, { useState } from 'react'
import styles from './index.module.scss'
import {useSelector} from "react-redux"
import cx from 'classnames'

const Message = (props) => {
    const senderID = useSelector(state => state.chat.senderID)
    const { user, content } = props

    return (
        <div className={styles.container}>
            <div 
                className={cx(
                    styles.content, { 
                        [styles.recieverMode]: user != senderID,
                        [styles.senderMode]: user == senderID
                    }
                )}
            >
                {content}
            </div>
        </div>
    )
}

export default Message