import React from 'react'
import './UserInfo.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase/firebase'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const { currUser } = useSelector((state) => state.user)
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
