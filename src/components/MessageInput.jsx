import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
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
        if (img) {
            const storageRef = ref(storage, uuidv4())
            const upladTask = await uploadBytesResumable(storageRef, img)
            const downloadUrl = await getDownloadURL(upladTask.ref)
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
        setImg(null)
        setText('')
    }

    return (
        <div className="MessageInput">
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
