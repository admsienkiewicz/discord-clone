import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './UserInfo.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const UserInfo = () => {
    const { currUser } = useContext(UserContext)
    return (
        <div className="UserInfo">
            <div className="UserInfo__content">
                <div className="wrapper--userInfo">
                    <img src={currUser.photoURL} alt="useravatar" className="UserInfo__avatar" />
                </div>
                <span className="UserInfo__username">{currUser.displayName}</span>
            </div>
            <button className="UserInfo__logoutBtn" onClick={() => signOut(auth)}>
                Log out
            </button>
        </div>
    )
}

export default UserInfo
