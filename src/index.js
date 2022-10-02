import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SidebarContextProvider } from './context/SidebarContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <SidebarContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </SidebarContextProvider>
)
