import React from 'react'
import ChannelMessages from './ChannelMessages'
import './Channel.scss'
import { HiHashtag } from 'react-icons/hi'
import MessageInput from './MessageInput'

const Channel = () => {
    return (
        <div className="Channel">
            <div className="Channel__channelInfo">
                <HiHashtag />
                <span className="Channel__channelInfo--name">Channel</span>
            </div>
            <ChannelMessages />
            <MessageInput />
        </div>
    )
}

export default Channel
