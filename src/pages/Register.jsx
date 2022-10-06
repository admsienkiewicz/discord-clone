import React, { useState } from 'react'
import './Register.scss'
import { MdOutlineImageSearch } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import ReactLoading from 'react-loading'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const registerUser = async (e) => {
        setLoading(true)
        setError('')
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            //create user to authentication table
            const authenticatedUser = await createUserWithEmailAndPassword(auth, email, password)
            //upload photo
            const storageRef = ref(storage, authenticatedUser.user.uid)
            const uploadTask = await uploadBytesResumable(storageRef, file)
            const photoURL = await getDownloadURL(uploadTask.ref)
            //update user profile with displayName and photoUrl
            await updateProfile(authenticatedUser.user, { displayName, photoURL })
            //create user table in firebase database
            await setDoc(doc(db, 'users', authenticatedUser.user.uid), {
                uid: authenticatedUser.user.uid,
                displayName,
                email,
                photoURL,
            })
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }
    return (
        <div className="Register">
            {error && <span className="errorMessage">{error}</span>}
            <div className="formContainer">
                {loading ? <ReactLoading type={'spin'} /> : <FaDiscord className="formContainer__appLogo" />}
                <span className="formContainer__title">Register</span>
                <form onSubmit={registerUser}>
                    <input type="text" className="formContainer__input" placeholder="Enter username" />
                    <input type="email" className="formContainer__input" placeholder="Enter mail" />
                    <input type="password" className="formContainer__input" placeholder="Enter password" />
                    <input type="file" id="selectImage" style={{ display: 'none' }} />
                    <label htmlFor="selectImage" className="formContainer__selectImage">
                        <MdOutlineImageSearch className="formContainer__selectImage--icon" />
                        <span className="formContainer__selectImage--text">Select your avatar</span>
                    </label>
                    <button className="formContainer__submitBtn">Register</button>
                </form>
                <span className="formContainer__redirectMessage">
                    Already have an account? <Link to={'/login'}>Login now</Link>
                </span>
            </div>
        </div>
    )
}

export default Register
