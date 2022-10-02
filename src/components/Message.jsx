import React from 'react'
import './Message.scss'

const Message = () => {
    return (
        <div className="Message">
            <div className="Message__avatar">
                <img
                    src="https://pbs.twimg.com/media/FeEw7IIXgAI0TqR?format=jpg&name=small"
                    alt=""
                    className="Message__avatar--img"
                />
            </div>
            <div className="Message__content">
                <div className="Message__info">
                    <span className="Message__info--username">Lewis Hemiltonn</span>
                    <p className="Message__info--date">21-12-2022</p>
                </div>
                <img
                    src="https://pbs.twimg.com/media/FeEw7IIXgAI0TqR?format=jpg&name=small"
                    alt=""
                    className="Message__content--img"
                />
                <span className="Message__content--text">Elo roberto</span>
            </div>
        </div>
    )
}

export default Message
