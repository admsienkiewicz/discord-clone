import React, { useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import './Login.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    const guestLogin = async () => {
        setLoading(true)
        setError('')
        try {
            await signInWithEmailAndPassword(auth, 'guest@wp.pl', 'passwordGuest')
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }
    return (
        <div className="Login">
            {error && <span className="errorMessage">{error}</span>}
            <div className="formContainer">
                {loading ? <ReactLoading type={'spin'} /> : <FaDiscord className="formContainer__appLogo" />}
                <span className="formContainer__title">Login</span>
                <form onSubmit={loginUser}>
                    <input type="email" className="formContainer__input" placeholder="Enter mail" />
                    <input type="password" className="formContainer__input" placeholder="Enter password" />
                    <button className="formContainer__submitBtn">Login</button>
                </form>
                <span className="formContainer__redirectMessage">
                    Don't have an account yet? <Link to={'/register'}>Register now</Link>
                </span>
                <div className="Login__guest">
                    <span className="Login__guest--message">or try guest account this time</span>
                    <button className="Login__guest--btn" onClick={guestLogin}>
                        Use guest account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
