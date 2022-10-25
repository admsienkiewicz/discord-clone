import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import './ChannelMessages.scss'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useSelector } from 'react-redux'

const ChannelMessages = () => {
    const { currChannel } = useSelector((state) => state.channel)
    const [messages, setMessages] = useState([])
    const endRef = useRef()

    useEffect(() => {
        const getMessages = () => {
            //listener to changes on channels document for current channel
            const unsub = onSnapshot(doc(db, 'channels', currChannel.channelId), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages)
                    console.log('newmessages')
                }
            })
            return () => {
                unsub()
            }
        }

        //prevent from running when currChannel is undefined
        currChannel.channelId && getMessages()
    }, [currChannel.channelId])

    //scroll to the end of channel messages on messages array change
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="ChannelMessages">
            {messages.map((msg, index) => {
                return <Message key={index} msgProps={msg} />
            })}
            <div ref={endRef}></div>
        </div>
    )
}

export default ChannelMessages
