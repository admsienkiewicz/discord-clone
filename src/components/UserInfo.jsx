import React from 'react'
import './UserInfo.scss'

const UserInfo = () => {
    return (
        <div className="UserInfo">
            <img
                src="https://scontent-waw1-1.xx.fbcdn.net/v/t39.30808-6/309118130_984176976307579_4925692051858564898_n.jpg?stp=dst-jpg_p180x540&_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=0FcwKgmIlucAX_05-rk&_nc_ht=scontent-waw1-1.xx&oh=00_AT_rNCA1s-VoiPKed5hFX9GM7ghrYDzugDyuFJBFE6gBxw&oe=633EE8AF"
                alt=""
                className="UserInfo__avatar"
            />
            <span className="UserInfo__username">Robertoo</span>
        </div>
    )
}

export default UserInfo
