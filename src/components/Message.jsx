import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import './Message.scss'
import ReactLoading from 'react-loading'

const Message = ({ msgProps }) => {
    const { senderImg, senderName, sendDate, senderId, contentText, contentImg } = msgProps
    const { currUser } = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <div className={`Message`} ref={ref}>
            <div className="Message__avatar">
                <img src={senderImg} className="Message__avatar--img" />
            </div>
            <div className="Message__content">
                <div className="Message__info">
                    <span className="Message__info--username">{senderName}</span>
                    <p className="Message__info--date">{sendDate}</p>
                </div>
                <span className="Message__content--text">{contentText}</span>
                {contentImg && loading && <ReactLoading type={'spin'} />}
                {contentImg && (
                    <img
                        src={contentImg}
                        className="Message__content--img"
                        style={loading ? { display: 'none' } : {}}
                        onLoad={() => setLoading(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Message
