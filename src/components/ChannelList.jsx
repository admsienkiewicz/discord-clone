import React, { useContext, useState } from 'react'
import './ChannelList.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { HiHashtag } from 'react-icons/hi'
import { SidebarContext } from '../context/SidebarContext'

const ChannelList = () => {
    const { setOpenSideBar } = useContext(SidebarContext)
    const [toggleList, setToggleList] = useState(true)
    return (
        <div className="ChannelList">
            <div className="ChannelList__header" onClick={() => setToggleList((state) => !state)}>
                {!toggleList ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                <span>Channels</span>
            </div>
            {toggleList && (
                <ul>
                    <div className="ChannelList__content" onClick={() => setOpenSideBar(false)}>
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                    <div className="ChannelList__content">
                        <HiHashtag />
                        <span className="channel__name">Main Channel</span>
                    </div>
                </ul>
            )}
        </div>
    )
}

export default ChannelList
