import React from 'react'
import Channel from '../components/Channel'
import Server from '../components/Server'
import ServerList from '../components/ServerList'
import { SidebarContextProvider } from '../context/SidebarContext'
import Div100vh from 'react-div-100vh'
import './Main.scss'

const Main = () => {
    return (
        <SidebarContextProvider>
            <Div100vh className="Main">
                <ServerList />
                <Server />
                <Channel />
            </Div100vh>
        </SidebarContextProvider>
    )
}

export default Main
