import React from 'react'
import './CreateServer.scss'
import { MdOutlineImageSearch } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CreateServer = () => {
    return (
        <div className="CreateServer">
            <div className="formContainer">
                <span className="formContainer__title">Create server</span>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="file" id="selectImage" style={{ display: 'none' }} />
                    <label htmlFor="selectImage" className="formContainer__selectImage">
                        <MdOutlineImageSearch className="formContainer__selectImage--icon" />
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
                        <button className="formContainer__submitBtn create">Create</button>
                        <button className="formContainer__submitBtn cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateServer
