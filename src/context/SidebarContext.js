//sideBar context provides information for closing openning sidebar
import { createContext, useState } from 'react'

export const SidebarContext = createContext()

export const SidebarContextProvider = ({ children }) => {
    const [openSideBar, setOpenSideBar] = useState(true)
    return <SidebarContext.Provider value={{ openSideBar, setOpenSideBar }}>{children}</SidebarContext.Provider>
}
