import React, { useContext, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import './DeleteServer.scss'
import { ServerContext } from '../context/ServerContext'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const DeleteServer = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { currServer } = useContext(ServerContext)

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteDoc(doc(db, 'servers', currServer.serverId))
            await deleteDoc(doc(db, 'serverChannels', currServer.serverId))
            const q = query(collection(db, 'channels'), where('serverId', '==', currServer.serverId))
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                deleteDoc(doc.ref())
            })
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="DeleteServer">
            {error && <span className="errorMessage">{error}</span>}
            <div className="formContainer">
                {loading ? <ReactLoading type={'spin'} /> : <FaDiscord className="formContainer__appLogo" />}
                <span className="formContainer__title">Delete server {currServer.name}</span>
                <span className="formContainer__confirmationMessage">
                    Are you sure you want to delete server? <br></br>It will also remove all conversations within
                    servers channels.
                </span>
                <div className="formContainer__buttons">
                    <button className="formContainer__submitBtn cancel" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                    <button type="sumbit" className="formContainer__submitBtn delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteServer
