import React, { useContext, useState } from 'react'
import ChannelMessages from './ChannelMessages'
import './Channel.scss'
import { HiHashtag } from 'react-icons/hi'
import { GoThreeBars } from 'react-icons/go'
import MessageInput from './MessageInput'
import { SidebarContext } from '../context/SidebarContext'

const Channel = () => {
    const { setOpenSideBar, openSideBar } = useContext(SidebarContext)
    return (
        <div className={`Channel ${openSideBar && 'hidden'}`}>
            <div className="Channel__channelInfo">
                <GoThreeBars className="Channel__channelInfo--openSide" onClick={() => setOpenSideBar(true)} />
                <HiHashtag />
                <span className="Channel__channelInfo--name">Channel</span>
            </div>
            <ChannelMessages />
            <MessageInput />
        </div>
    )
}

export default Channel
