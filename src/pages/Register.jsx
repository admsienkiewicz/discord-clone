import React, { useState } from 'react'
import './Register.scss'
import { MdOutlineImageSearch } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import ReactLoading from 'react-loading'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const navigate = useNavigate()

    const registerUser = async (e) => {
        setError('')
        e.preventDefault()
        const inputs = {}
        inputs.displayName = e.target[0].value
        inputs.email = e.target[1].value
        inputs.password = e.target[2].value
        inputs.image = e.target[3].files[0]

        let valid = true
        for (const [inputName, inputValue] of Object.entries(inputs)) {
            if (!inputValue) {
                setError(`Missing input field: ${inputName}`)
                valid = false
                break
            }
        }
        if (!valid) return
        setLoading(true)
        try {
            //create user to authentication table
            const authenticatedUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            //upload photo
            const storageRef = ref(storage, authenticatedUser.user.uid)
            const uploadTask = await uploadBytesResumable(storageRef, inputs.image)
            const photoURL = await getDownloadURL(uploadTask.ref)
            //update user profile with displayName and photoUrl
            await updateProfile(authenticatedUser.user, { displayName: inputs.displayName, photoURL })
            //create user table in firebase database
            await setDoc(doc(db, 'users', authenticatedUser.user.uid), {
                uid: authenticatedUser.user.uid,
                displayName: inputs.displayName,
                email: inputs.email,
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
                    <input
                        type="file"
                        id="selectImage"
                        style={{ display: 'none' }}
                        onChange={(e) => setSelectedImage(e.target.files[0].name)}
                    />
                    <label htmlFor="selectImage" className="formContainer__selectImage">
                        <MdOutlineImageSearch className="formContainer__selectImage--icon" />
                        <span className="formContainer__selectImage--text">
                            {(selectedImage && `Selected: ${selectedImage}`) || 'Choose Your avatar'}
                        </span>
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
