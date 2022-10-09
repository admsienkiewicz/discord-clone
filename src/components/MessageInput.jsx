import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { ChannelContext } from '../context/ChannelContext'
import { UserContext } from '../context/UserContext'
import { db, storage } from '../firebase'
import './MessageInput.scss'

const MessageInput = () => {
    const { currUser } = useContext(UserContext)
    const { currChannel } = useContext(ChannelContext)
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const sendMessage = async () => {
        setImg(null)
        setText('')
        if (!img && !text) return
        if (img) {
            //uplaod img to storage
            const storageRef = ref(storage, uuidv4())
            const upladTask = await uploadBytesResumable(storageRef, img)
            //get photo url
            const downloadUrl = await getDownloadURL(upladTask.ref)
            //append to message array for current channel
            await updateDoc(doc(db, 'channels', currChannel.channelId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    senderId: currUser.uid,
                    senderName: currUser.displayName,
                    senderImg: currUser.photoURL,
                    sendDate: new Date().toLocaleString('en'),
                    contentImg: downloadUrl,
                    contentText: text,
                }),
            })
        } else {
            //append to message array for current channel
            await updateDoc(doc(db, 'channels', currChannel.channelId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    senderId: currUser.uid,
                    senderName: currUser.displayName,
                    senderImg: currUser.photoURL,
                    sendDate: new Date().toLocaleString('en'),
                    contentText: text,
                }),
            })
        }
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
            <button className="MessageInput__sendBtn" onClick={sendMessage}>
                Send
            </button>
        </div>
    )
}

export default MessageInput
