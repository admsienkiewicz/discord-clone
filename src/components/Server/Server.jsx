import React, { useContext, useEffect, useState } from 'react'
import ChannelList from './ChannelList/ChannelList'
import UserInfo from './ChannelList/UserInfo/UserInfo'
import './Server.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { SidebarContext } from '../../context/SidebarContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeServer } from '../../redux-toolkit/globalStates/currServerSlice'

const Server = () => {
    const [openOptions, setOpenOptions] = useState(false)
    const { openSideBar } = useContext(SidebarContext)
    const { currServer } = useSelector((state) => state.server)
    const { currUser } = useSelector((state) => state.channel)
    const [imgLoading, setImgLoading] = useState(true)
    const dispatch = useDispatch()

    console.log(currServer)
    useEffect(() => {
        const updateServer = () => {
            //listener for changes on server document for currServer
            const unsub = onSnapshot(doc(db, 'servers', currServer.serverId), (doc) => {
                if (doc.exists()) {
                    const { creationDate, ...server } = doc.data()
                    dispatch(changeServer(server))
                }
            })
            return () => {
                unsub()
            }
        }
        //prevents form running with currServer undefined
        currServer.serverId && updateServer()
    }, [currServer.serverId])

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
                                {currUser.uid === currServer.adminId ? (
                                    <Link to={'/edit-server'} style={{ textDecoration: 'none', color: 'white' }}>
                                        Edit server
                                    </Link>
                                ) : (
                                    'Edit server'
                                )}
                                <span class="tooltiptext">Only server admin can edit</span>
                            </div>
                            <div className="delete">
                                {currUser.uid === currServer.adminId ? (
                                    <Link to={'/delete-server'} style={{ textDecoration: 'none', color: 'white' }}>
                                        Delete server
                                    </Link>
                                ) : (
                                    'Delete server'
                                )}
                                <span className="tooltiptext">Only server admin can delete</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="Server__details">
                {imgLoading && <ReactLoading type={'bubbles'} />}
                <div className="wrapper--server">
                    <img
                        src={currServer.logo}
                        className="Server__details--logo"
                        alt="server logo"
                        style={imgLoading ? { display: 'none' } : {}}
                        onLoad={() => setImgLoading(false)}
                    />
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
