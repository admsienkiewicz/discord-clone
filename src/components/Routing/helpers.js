import CreateServer from '../../pages/CreateServer'
import DeleteServer from '../../pages/DeleteServer'
import EditServer from '../../pages/EditServer'
import Login from '../../pages/Login'
import Main from '../../pages/Main'
import Register from '../../pages/Register'
import { CREATE_SERVER, DELETE_SERVER, EDIT_SERVER, LOGIN, MAIN, REGISTER } from './paths'

export const ROUTES = [
    {
        path: LOGIN,
        Component: Login,
        isProtected: false,
    },
    {
        path: REGISTER,
        Component: Register,
        isProtected: false,
    },
    {
        path: CREATE_SERVER,
        Component: CreateServer,
        isProtected: true,
    },
    {
        path: DELETE_SERVER,
        Component: DeleteServer,
        isProtected: true,
    },
    {
        path: EDIT_SERVER,
        Component: EditServer,
        isProtected: true,
    },
    {
        path: MAIN,
        Component: Main,
        isProtected: true,
    },
]
