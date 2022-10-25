import React, { useContext, useEffect, useState } from 'react'
import ServerIcon from './ServerIcon/ServerIcon'
import './ServerList.scss'
import { FaDiscord } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { SidebarContext } from '../../context/SidebarContext'
import { db } from '../../firebase/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeServer } from '../../redux-toolkit/globalStates/currServerSlice'

const ServerList = () => {
    const { openSideBar } = useContext(SidebarContext)
    const [servers, setServers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        //listener on changes for whole serevers collection
        const q = query(collection(db, 'servers'))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const serversArray = []
            querySnapshot.forEach((doc) => {
                serversArray.push(doc.data())
            })
            const sorted = serversArray.sort((a, b) => a.creationDate - b.creationDate)
            const { creationDate, ...server } = sorted[0]
            dispatch(changeServer(server))
            setServers(sorted)
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
            <div className="wrapper-overflow">
                <div className="ServerList__icons">
                    {servers?.map((server) => (
                        <div
                            onClick={() => {
                                const { creationDate, ...serverDetails } = server
                                dispatch(changeServer(serverDetails))
                            }}
                            key={server.serverId}
                        >
                            <ServerIcon serverImg={server.logo} serverName={server.name} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="ServerList__addIcon">
                <BsPlus className="addIcon" onClick={() => navigate('/create-server')} />
                <span className="addMessage">Add server</span>
            </div>
        </div>
    )
}

export default ServerList
