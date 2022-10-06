import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './Message.scss'

const Message = ({ msgProps }) => {
    const { senderImg, senderName, sendDate, senderId, contentText, contentImg } = msgProps
    const { currUser } = useContext(UserContext)
    return (
        <div className={`Message`}>
            <div className="Message__avatar">
                <img src={senderImg} className="Message__avatar--img" />
            </div>
            <div className="Message__content">
                <div className="Message__info">
                    <span className="Message__info--username">{senderName}</span>
                    <p className="Message__info--date">{sendDate}</p>
                </div>
                {contentImg && <img src={contentImg} className="Message__content--img" />}
                <span className="Message__content--text">{contentText}</span>
            </div>
        </div>
    )
}

export default Message
