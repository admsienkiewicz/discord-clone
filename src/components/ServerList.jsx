import React, { useContext, useEffect, useState } from 'react'
import ServerIcon from './ServerIcon'
import './ServerList.scss'
import { FaDiscord } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { SidebarContext } from '../context/SidebarContext'
import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext'

const ServerList = () => {
    const { openSideBar } = useContext(SidebarContext)
    const [servers, setServers] = useState([])
    const navigate = useNavigate()
    const { setCurrServer, currServer } = useContext(ServerContext)

    useEffect(() => {
        const q = query(collection(db, 'servers'))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const serversArray = []
            querySnapshot.forEach((doc) => {
                serversArray.push(doc.data())
            })
            setCurrServer(serversArray[0])
            setServers(serversArray)
        })
        return () => {
            unsub()
        }
    }, [])
    return (
        <div className={`ServerList ${!openSideBar && 'hidden'}`}>
            <div className="ServerList__appIcon">
                <FaDiscord className="appIcon" color="white" />
            </div>
            <div className="ServerList__icons">
                {servers?.map((server) => (
                    <div onClick={() => setCurrServer(server)} key={server.serverId}>
                        <ServerIcon serverImg={server.logo} serverName={server.name} />
                    </div>
                ))}
            </div>
            <div className="ServerList__addIcon">
                <BsPlus className="addIcon" onClick={() => navigate('/create-server')} />
                <span className="addMessage">Add server</span>
            </div>
        </div>
    )
}

export default ServerList
