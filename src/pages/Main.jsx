import React from 'react'
import Channel from '../components/Channel'
import Server from '../components/Server'
import ServerList from '../components/ServerList'
import { SidebarContextProvider } from '../context/SidebarContext'
import './Main.scss'

const Main = () => {
    return (
        <SidebarContextProvider>
            <div className="Main">
                <ServerList />
                <Server />
                <Channel />
            </div>
        </SidebarContextProvider>
    )
}

export default Main
