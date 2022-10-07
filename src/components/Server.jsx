import React, { useContext, useEffect, useState } from 'react'
import ChannelList from './ChannelList'
import UserInfo from './UserInfo'
import './Server.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { SidebarContext } from '../context/SidebarContext'
import { ServerContext } from '../context/ServerContext'
import { UserContext } from '../context/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Server = () => {
    const [openOptions, setOpenOptions] = useState(false)
    const { openSideBar } = useContext(SidebarContext)
    const { currServer, setCurrServer } = useContext(ServerContext)
    const { currUser } = useContext(UserContext)

    useEffect(() => {
        const updateServer = () => {
            //listener for changes on server document for currServer
            const unsub = onSnapshot(doc(db, 'servers', currServer.serverId), (doc) => {
                if (doc.exists()) {
                    setCurrServer(doc.data())
                }
            })
            return () => {
                unsub()
            }
        }
        //prevents form running with currServer undefined
        currServer.serverId && updateServer()
    }, [currServer.serverId, setCurrServer])

    return (
        <div className={`Server ${!openSideBar && 'hidden'} `}>
            <div className="Server__info">
                <span className="Server__name">{currServer.name}</span>
                {!openOptions && (
                    <MdKeyboardArrowDown className="Server__openOptions" onClick={() => setOpenOptions(true)} />
                )}
                {openOptions && (
                    <>
                        <MdKeyboardArrowUp className="Server__closeOptions" onClick={() => setOpenOptions(false)} />
                        <div className={`Server__options ${currUser.uid !== currServer.adminId && 'disable'}`}>
                            <div className="edit">
                                Edit server
                                <span class="tooltiptext">Only server admin can edit</span>
                            </div>
                            <div className="delete">
                                Delete server
                                <span class="tooltiptext">Only server admin can delete</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="Server__details">
                <div className="wrapper--server">
                    <img src={currServer.logo} className="Server__details--logo" alt="server logo" />
                </div>
                <span className="Server__details--description">{currServer.description}</span>
                <span className="Server__details--admin">
                    <b>Server Admin:</b> {currServer.adminName}
                </span>
            </div>
            <ChannelList />
            <UserInfo />
        </div>
    )
}

export default Server
