import React from 'react'

const SendMessageBtn = ({ ...buttonProps }) => {
    return (
        <button className="MessageInput__sendBtn" {...buttonProps}>
            Send
        </button>
    )
}

export default SendMessageBtn
