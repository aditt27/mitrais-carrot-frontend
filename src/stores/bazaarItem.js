import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

const slice = createSlice({
    name: 'bazaarItem',
    initialState: initialState,
    reducers: {
        apiRequest: (state, action)=> {
            state.data = action.payload.result
        }
    }
})

export const {apiRequest} = slice.actions
export default slice.reducer