import React from 'react'
import ServerIcon from './ServerIcon'
import './ServerList.scss'
import { FaDiscord } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'

const ServerList = () => {
    return (
        <div className="ServerList">
            <div className="ServerList__appIcon">
                <FaDiscord className="appIcon" color="white" />
            </div>
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <div className="ServerList__addIcon">
                <BsPlus className="addIcon" />
                <span className="addMessage">Add server</span>
            </div>
        </div>
    )
}

export default ServerList
