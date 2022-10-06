import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChannelList.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { HiHashtag } from 'react-icons/hi'
import { BsHandIndex, BsPlus } from 'react-icons/bs'
import { SidebarContext } from '../context/SidebarContext'
import { ServerContext } from '../context/ServerContext'
import { ChannelContext } from '../context/ChannelContext'
import { collection, doc, documentId, FieldPath, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
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
        setNewChannelName('')
        const newChannelId = uuidv4()
        await updateDoc(doc(db, 'serverChannels', currServer.serverId), {
            [newChannelId]: {
                channelId: newChannelId,
                channelName: newChannelName,
                serverId: currServer.serverId,
                creationDate: new Date(),
            },
        })
        console.log('added')
        await setDoc(doc(db, 'channels', newChannelId), {
            messages: [],
        })
    }

    const handleEnter = async (e) => {
        if (e.code === 'Enter') await addChannel()
    }

    useEffect(() => {
        if (!currServer.serverId) return
        const unsub = onSnapshot(
            query(collection(db, 'serverChannels'), where(documentId(), '==', currServer.serverId)),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    //Change between servers
                    if (change.type === 'added') {
                        const channelArray = Object.entries(change.doc.data())
                            .map((ch) => ch[1])
                            .sort((a, b) => a.creationDate - b.creationDate)
                        setChannels(channelArray)
                        setCurrChannel(channelArray[0])
                    }
                    //add new channel to current server
                    if (change.type === 'modified') {
                        const channelArray = Object.entries(change.doc.data())
                            .map((ch) => ch[1])
                            .sort((a, b) => a.creationDate - b.creationDate)
                        setChannels(channelArray)
                        setCurrChannel(channelArray[channelArray.length - 1])
                    }
                })
            }
        )
        return () => {
            unsub()
        }
    }, [currServer.serverId])

    useEffect(() => console.log('CurrentChannel:', currChannel), [currChannel])
    return (
        <div className="ChannelList" onKeyDown={handleEnter}>
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
                        <BsPlus className="ChannelList__addChannel--icon" onClick={addChannel} />
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
