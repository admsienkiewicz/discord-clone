import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeUser, logout } from '../redux-toolkit/globalStates/currUserSlice'
import { auth } from './firebase'

const FirebaseUserAuth = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    changeUser({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    })
                )
            } else {
                dispatch(logout())
            }
        })
        return () => {
            unsub()
        }
    }, [])
    return children
}

export default FirebaseUserAuth
