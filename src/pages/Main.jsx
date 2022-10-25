import React from 'react'
import Channel from '../components/Channel/Channel'
import Server from '../components/Server/Server'
import ServerList from '../components/ServerList/ServerList'
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
