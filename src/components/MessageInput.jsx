import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { db, storage } from '../firebase/firebase'
import SendMessageBtn from './atoms/buttons/SendMessageBtn'
import './MessageInput.scss'

const MessageInput = () => {
    const { currUser } = useSelector((state) => state.user)
    const { currChannel } = useSelector((state) => state.channel)
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const sendMessage = async () => {
        setImg(null)
        setText('')
        if (!img && !text) return
        //uplaod img to storage
        const storageRef = img && ref(storage, uuidv4())
        const upladTask = img && (await uploadBytesResumable(storageRef, img))
        //get photo url
        const downloadUrl = img && (await getDownloadURL(upladTask.ref))
        //create message object
        const msgObject = {
            id: uuidv4(),
            senderId: currUser.uid,
            senderName: currUser.displayName,
            senderImg: currUser.photoURL,
            sendDate: new Date().toLocaleString('en'),
            contentText: text,
            ...(img && { contentImg: downloadUrl }),
        }
        console.log(msgObject)
        //append to message array for current channel
        await updateDoc(doc(db, 'channels', currChannel.channelId), {
            messages: arrayUnion({ ...msgObject }),
        })
    }

    const handleEnter = async (e) => {
        e.code === 'Enter' && (await sendMessage())
    }

    return (
        <div className="MessageInput" onKeyDown={handleEnter}>
            <input
                type="file"
                style={{ display: 'none' }}
                id="attachFile"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="attachFile">
                <BsPlus className="MessageInput__attachFile" />
            </label>
            <input
                type="text"
                className="MessageInput__text"
                placeholder="Type something here..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <SendMessageBtn onClick={sendMessage} />
        </div>
    )
}

export default MessageInput
