import React from 'react'
import './Register.scss'
import { MdOutlineImageSearch } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className="Register">
            <div className="formContainer">
                <FaDiscord className="formContainer__appLogo" />
                <span className="formContainer__title">Register</span>
                <form>
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
