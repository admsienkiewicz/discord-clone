import React, { useState } from 'react'
import './ServerIcon.scss'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'

const ServerIcon = ({ serverImg, serverName }) => {
    const [loading, setLoading] = useState(true)
    const { currServer } = useSelector((state) => state.server)
    return (
        <div className={`ServerIcon ${currServer.name === serverName && 'selected'}`}>
            {loading && <ReactLoading type={'bubbles'} />}
            <div className="ServerIcon__selection"></div>
            <div className="wrapper" style={loading ? { display: 'none' } : {}}>
                <img
                    src={serverImg}
                    className="ServerIcon__img"
                    style={loading ? { display: 'none' } : {}}
                    onLoad={() => setLoading(false)}
                />
            </div>
            <span className="ServerIcon__name">{serverName}</span>
        </div>
    )
}

export default ServerIcon
