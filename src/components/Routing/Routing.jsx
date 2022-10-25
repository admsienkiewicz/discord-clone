import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './helpers'
import ProtectedRoute from './Protected/ProtectedRoute'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                {ROUTES.map(({ path, Component, isProtected }) => {
                    return (
                        <Route
                            element={
                                <ProtectedRoute isProtected={isProtected}>
                                    <Component />
                                </ProtectedRoute>
                            }
                            path={path}
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
