import React, { useEffect, useRef, useState } from 'react'
import './Message.scss'
import ReactLoading from 'react-loading'

const Message = ({ msgProps }) => {
    const { senderImg, senderName, sendDate, contentText, contentImg } = msgProps
    const [loading, setLoading] = useState(true)

    const ref = useRef()

    // to fix scroll to last message on first render
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [loading])

    return (
        <div ref={ref} className={`Message`}>
            <div className="Message__avatar">
                <img src={senderImg} className="Message__avatar--img" alt="user avatar" />
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
                        alt="contet img"
                    />
                )}
            </div>
        </div>
    )
}

export default Message
