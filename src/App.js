import { Provider } from 'react-redux'
import './App.scss'
import Routing from './components/Routing/Routing'
import FirebaseUserAuth from './firebase/FirebaseUserAuth'
import { store } from './redux-toolkit/store'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <FirebaseUserAuth>
                    <Routing />
                </FirebaseUserAuth>
            </Provider>
        </div>
    )
}

export default App
