import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import './ChannelMessages.scss'
import { ChannelContext } from '../context/ChannelContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const ChannelMessages = () => {
    const { currChannel } = useContext(ChannelContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, 'channels', currChannel.channelId), (doc) => {
                doc.exists() && setMessages(doc.data().messages)
            })
            return () => {
                unsub()
            }
        }
        currChannel.channelId && getMessages()
    }, [currChannel.channelId])
    return (
        <div className="ChannelMessages">
            {messages?.map((msg, index) => {
                return <Message key={index} msgProps={msg} />
            })}
        </div>
    )
}

export default ChannelMessages
