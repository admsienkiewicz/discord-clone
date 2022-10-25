import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isProtected }) => {
    const { currUser } = useSelector((state) => state.user)
    if (!isProtected) return children
    if (currUser) return children
    return <Navigate to="/login" />
}

export default ProtectedRoute
