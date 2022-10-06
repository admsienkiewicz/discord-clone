import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChannelContextProvider } from './context/ChannelContext'
import { ServerContextProvider } from './context/ServerContext'
import { SidebarContextProvider } from './context/SidebarContext'
import { UserContextProvider } from './context/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <UserContextProvider>
        <ServerContextProvider>
            <ChannelContextProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ChannelContextProvider>
        </ServerContextProvider>
    </UserContextProvider>
)
