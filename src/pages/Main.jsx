import React, { useContext } from 'react'
import Channel from '../components/Channel'
import Server from '../components/Server'
import ServerList from '../components/ServerList'
import { SidebarContext, SidebarContextProvider } from '../context/SidebarContext'
import './Main.scss'

const Main = () => {
    const { openSideBar } = useContext(SidebarContext)
    return (
        <div className="Main">
            <ServerList />
            <Server />
            <Channel />
        </div>
    )
}

export default Main
