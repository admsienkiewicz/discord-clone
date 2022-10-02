import React from 'react'
import { BsPlus } from 'react-icons/bs'
import './MessageInput.scss'

const MessageInput = () => {
    return (
        <form className="MessageInput">
            <input type="file" style={{ display: 'none' }} id="attachFile" />
            <label htmlFor="attachFile">
                <BsPlus className="MessageInput__attachFile" />
            </label>
            <input type="text" className="MessageInput__text" placeholder="Type something here..." />
            <button className="MessageInput__sendBtn">Send</button>
        </form>
    )
}

export default MessageInput
