import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Login.scss'

const Login = () => {
    return (
        <div className="Login">
            <div className="formContainer">
                <FaDiscord className="formContainer__appLogo" />
                <span className="formContainer__title">Login</span>
                <form>
                    <input type="email" className="formContainer__input" placeholder="Enter mail" />
                    <input type="password" className="formContainer__input" placeholder="Enter password" />
                    <button className="formContainer__submitBtn">Login</button>
                </form>
                <span className="formContainer__redirectMessage">
                    Don't have an account yet? <Link to={'/register'}>Register now</Link>
                </span>
                <div className="Login__guest">
                    <span className="Login__guest--message">or try guest account this time</span>
                    <button className="Login__guest--btn">Use guest account</button>
                </div>
            </div>
        </div>
    )
}

export default Login
