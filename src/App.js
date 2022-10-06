import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import CreateServer from './pages/CreateServer'
import { UserContext, UserContextProvider } from './context/UserContext'
import { useContext } from 'react'

function App() {
    const { currUser } = useContext(UserContext)
    const RedirectToLogin = ({ children }) => {
        if (currUser) {
            return children
        }
        return <Navigate to="/login" />
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RedirectToLogin>
                                <Main />
                            </RedirectToLogin>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-server" element={<CreateServer />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
