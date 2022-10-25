import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currServer: {},
}

export const currServerSlice = createSlice({
    name: 'currServer',
    initialState,
    reducers: {
        changeServer: (state, action) => {
            state.currServer = action.payload
        },
    },
})

export const { changeServer } = currServerSlice.actions

export default currServerSlice.reducer
