import { configureStore } from '@reduxjs/toolkit'
import currUserReducer from './globalStates/currUserSlice'
import currServerReducer from './globalStates/currServerSlice'
import currChannelReducer from './globalStates/currChannelSlice'

export const store = configureStore({
    reducer: {
        user: currUserReducer,
        server: currServerReducer,
        channel: currChannelReducer,
    },
})
