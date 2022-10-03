import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import CreateServer from './pages/CreateServer'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-server" element={<CreateServer />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
