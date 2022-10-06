import React, { useContext, useState } from 'react'
import './CreateServer.scss'
import { MdOutlineImageSearch } from 'react-icons/md'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { uuidv4 } from '@firebase/util'
import { db, storage } from '../firebase'
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

const CreateServer = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { currUser } = useContext(UserContext)

    const addServer = async (e) => {
        e.preventDefault()
        setLoading(true)
        const file = e.target[0].files[0]
        const name = e.target[1].value
        const description = e.target[2].value
        const serverId = uuidv4()
        const adminId = currUser.uid
        const generalChannelId = uuidv4()
        try {
            //upload img to storage
            const storageRef = ref(storage, `photo_${serverId}`)
            const uploadTask = await uploadBytesResumable(storageRef, file)
            const logo = await getDownloadURL(uploadTask.ref)
            //create server document in firebase database
            await setDoc(doc(db, 'servers', serverId), {
                name,
                description,
                logo,
                serverId,
                adminId,
                adminName: currUser.displayName,
            })
            //create server-channel conection doc in firebase db
            await setDoc(doc(db, 'serverChannels', serverId), {})
            await updateDoc(doc(db, 'serverChannels', serverId), {
                [generalChannelId]: {
                    channelId: generalChannelId,
                    channelName: 'General',
                    serverId,
                    creationDate: serverTimestamp(),
                },
            })
            //create generalChannel document in firebase database
            await setDoc(doc(db, 'channels', generalChannelId), { messages: [] })
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="CreateServer">
            {error && <span className="errorMessage">{error}</span>}
            <div className="formContainer">
                <span className="formContainer__title">Create server</span>
                <form onSubmit={addServer}>
                    <input type="file" id="selectImage" style={{ display: 'none' }} />
                    <label htmlFor="selectImage" className="formContainer__selectImage">
                        {loading ? (
                            <ReactLoading type={'spin'} height="110px" />
                        ) : (
                            <MdOutlineImageSearch className="formContainer__selectImage--icon" />
                        )}
                        <span className="formContainer__selectImage--text">Choose server logo</span>
                    </label>
                    <input type="text" className="formContainer__input serverName" placeholder="Enter server name" />
                    <textarea
                        rows={5}
                        type="text"
                        className="formContainer__input serverDescription"
                        placeholder="Enter server description"
                    />
                    <div className="formContainer__buttons">
                        <button type="sumbit" className="formContainer__submitBtn create">
                            Create
                        </button>
                        <button className="formContainer__submitBtn cancel" onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateServer
