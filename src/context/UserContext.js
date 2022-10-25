// Provides context on currentlly logged in user
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrUser(user)
        })
        return () => {
            unsub()
        }
    }, [])
    return <UserContext.Provider value={{ currUser }}>{children}</UserContext.Provider>
}
