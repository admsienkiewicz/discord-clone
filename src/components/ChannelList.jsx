import React, { useContext, useEffect, useState } from 'react'
import './ChannelList.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { HiHashtag } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { SidebarContext } from '../context/SidebarContext'
import { ServerContext } from '../context/ServerContext'
import { ChannelContext } from '../context/ChannelContext'
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { uuidv4 } from '@firebase/util'

const ChannelList = () => {
    const { setOpenSideBar } = useContext(SidebarContext)
    const [toggleList, setToggleList] = useState(true)
    const { currServer } = useContext(ServerContext)
    const { setCurrChannel, currChannel } = useContext(ChannelContext)
    const [channels, setChannels] = useState([])
    const [newChannelName, setNewChannelName] = useState('')

    const addChannel = async () => {
        if (!newChannelName) return
        const newChannelId = uuidv4()
        await updateDoc(doc(db, 'serverChannels', currServer.serverId), {
            [newChannelId]: {
                channelId: newChannelId,
                channelName: newChannelName,
                serverId: currServer.serverId,
                creationDate: serverTimestamp(),
            },
        })
        console.log('added')
        await setDoc(doc(db, 'channels', newChannelId), {
            messages: [],
        })
        setNewChannelName('')
    }

    useEffect(() => {
        const getChannels = () => {
            const unsub = onSnapshot(doc(db, 'serverChannels', currServer.serverId), (doc) => {
                const channelArray = Object.entries(doc.data())
                    .map((ch) => ch[1])
                    .sort((a, b) => a.creationDate - b.creationDate)
                setChannels(channelArray)
                setCurrChannel(channelArray[0])
            })
            return () => {
                unsub()
            }
        }
        currServer.serverId && getChannels()
    }, [currServer.serverId])
    return (
        <div className="ChannelList">
            <div className="ChannelList__header" onClick={() => setToggleList((state) => !state)}>
                {!toggleList ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                <span>Channels</span>
            </div>
            {toggleList && (
                <div className="ChannelLis__contentList">
                    {channels?.map((channel) => {
                        return (
                            <div
                                className={`ChannelList__content ${
                                    currChannel.channelId === channel.channelId && 'selected'
                                }`}
                                onClick={() => {
                                    setOpenSideBar(false)
                                    setCurrChannel(channel)
                                }}
                                key={channel.channelId}
                            >
                                <HiHashtag />
                                <span className="channel__name">{channel.channelName}</span>
                            </div>
                        )
                    })}
                    <div className="ChannelList__addChannel">
                        <BsPlus className="ChannelList__addChannel--icon" onClick={() => addChannel()} />
                        <input
                            type="text"
                            className="ChannelList__addChannel--input"
                            placeholder="Add channel"
                            onChange={(e) => setNewChannelName(e.target.value)}
                            value={newChannelName}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChannelList
