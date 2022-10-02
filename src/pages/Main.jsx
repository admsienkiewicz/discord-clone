import React from 'react'
import Channel from '../components/Channel'
import Server from '../components/Server'
import ServerList from '../components/ServerList'
import './Main.scss'

const Main = () => {
    return (
        <div className="Main">
            <ServerList />
            <Server />
            <Channel />
        </div>
    )
}

export default Main
