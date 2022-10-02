import React from 'react'
import './ServerIcon.scss'

const ServerIcon = ({ serverName }) => {
    return (
        <div className="ServerIcon">
            <div className="ServerIcon__selection"></div>
            <img
                src="https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/104598313_3043668482348090_7809686983493534073_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Fskfq0vXaIAX9_tYTH&_nc_ht=scontent-waw1-1.xx&oh=00_AT8uzucF-fyHIDEsgYayiZFmtkvDZQiua3Pcn8bMQr2HUg&oe=635F990E"
                alt=""
                className="ServerIcon__img"
            />
            <span className="ServerIcon__name">Server namea</span>
        </div>
    )
}

export default ServerIcon
