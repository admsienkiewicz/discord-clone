import { createContext, useState } from 'react'

export const ServerContext = createContext()

export const ServerContextProvider = ({ children }) => {
    const [currServer, setCurrServer] = useState({})
    return <ServerContext.Provider value={{ currServer, setCurrServer }}> {children}</ServerContext.Provider>
}
