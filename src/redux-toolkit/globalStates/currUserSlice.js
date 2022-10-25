import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currUser: null,
}

export const currUserSlice = createSlice({
    name: 'currUser',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.currUser = action.payload
        },
        logout: (state) => {
            state.currUser = null
        },
    },
})

export const { changeUser, logout } = currUserSlice.actions

export default currUserSlice.reducer
