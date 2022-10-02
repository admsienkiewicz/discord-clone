import React, { useContext } from 'react'
import ServerIcon from './ServerIcon'
import './ServerList.scss'
import { FaDiscord } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { SidebarContext } from '../context/SidebarContext'

const ServerList = () => {
    const { openSideBar } = useContext(SidebarContext)
    return (
        <div className={`ServerList ${!openSideBar && 'hidden'}`}>
            <div className="ServerList__appIcon">
                <FaDiscord className="appIcon" color="white" />
            </div>
            <div className="ServerList__icons">
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
            </div>
            <div className="ServerList__addIcon">
                <BsPlus className="addIcon" />
                <span className="addMessage">Add server</span>
            </div>
        </div>
    )
}

export default ServerList
