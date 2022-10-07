// Provides context on currently open channel
import { createContext, useState } from 'react'

export const ChannelContext = createContext()
export const ChannelContextProvider = ({ children }) => {
    const [currChannel, setCurrChannel] = useState({})
    return <ChannelContext.Provider value={{ currChannel, setCurrChannel }}>{children}</ChannelContext.Provider>
}
