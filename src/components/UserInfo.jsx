import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './UserInfo.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const UserInfo = () => {
    const { currUser } = useContext(UserContext)
    return (
        <div className="UserInfo">
            <img src={currUser.photoURL} alt="" className="UserInfo__avatar" />
            <span className="UserInfo__username">{currUser.displayName}</span>
            <button className="UserInfo__logoutBtn" onClick={() => signOut(auth)}>
                Log out
            </button>
        </div>
    )
}

export default UserInfo
