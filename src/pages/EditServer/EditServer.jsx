import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { MdOutlineImageSearch } from 'react-icons/md'
import ReactLoading from 'react-loading'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext'
import { UserContext } from '../context/UserContext'
import { db, storage } from '../firebase/firebase'
import { uuidv4 } from '@firebase/util'
import './EditServer.scss'

const EditServer = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const navigate = useNavigate()
    const { currServer } = useContext(ServerContext)
    const [serverProps, setServerProps] = useState({ name: currServer.name, description: currServer.description })

    const handleEditServer = async (e) => {
        e.preventDefault()
        const image = e.target[0].files[0]
        const name = e.target[1].value
        const description = e.target[2].value
        setLoading(true)

        try {
            if (image) {
                //upload img to storage
                const storageRef = ref(storage, uuidv4())
                const uploadTask = await uploadBytesResumable(storageRef, image)
                const logo = await getDownloadURL(uploadTask.ref)
                //update server document in firebase database
                await updateDoc(doc(db, 'servers', currServer.serverId), {
                    name,
                    description,
                    logo,
                })
            }
            //update server document in firebase database
            await updateDoc(doc(db, 'servers', currServer.serverId), {
                name,
                description,
            })
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
        navigate('/')
    }
    return (
        <div className="EditServer">
            {error && <span className="errorMessage">{error}</span>}
            <div className="formContainer">
                <span className="formContainer__title">Edit Server</span>
                <form onSubmit={handleEditServer}>
                    <input
                        type="file"
                        id="selectImage"
                        style={{ display: 'none' }}
                        onChange={(e) => setSelectedImage(e.target.files[0].name)}
                    />
                    <label htmlFor="selectImage" className="formContainer__selectImage">
                        {loading ? (
                            <ReactLoading type={'spin'} height="110px" />
                        ) : (
                            <MdOutlineImageSearch className="formContainer__selectImage--icon" />
                        )}
                        <span className="formContainer__selectImage--text">
                            {(selectedImage && `Selected: ${selectedImage}`) || 'Change server logo'}
                        </span>
                    </label>
                    <input
                        type="text"
                        className="formContainer__input serverName"
                        placeholder="Enter server name"
                        value={serverProps.name}
                        onChange={(e) => setServerProps({ ...serverProps, name: e.target.value })}
                    />
                    <textarea
                        rows={5}
                        type="text"
                        className="formContainer__input serverDescription"
                        placeholder="Enter server description"
                        value={serverProps.description}
                        onChange={(e) => setServerProps({ ...serverProps, description: e.target.value })}
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

export default EditServer
