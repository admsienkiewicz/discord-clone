import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currChannel: {},
}

export const currChannelSlice = createSlice({
    name: 'currChannel',
    initialState,
    reducers: {
        changeChannel: (state, action) => {
            state.currChannel = action.payload
        },
    },
})

export const { changeChannel } = currChannelSlice.actions

export default currChannelSlice.reducer
