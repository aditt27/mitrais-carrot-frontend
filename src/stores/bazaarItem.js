import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    currentPage: 0,
    totalPages: 0
}

const slice = createSlice({
    name: 'bazaarItem',
    initialState: initialState,
    reducers: {
        saveCurrentPage: (state, action)=> {
            state.data = action.payload.data
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
        }
    }
})

export const { saveCurrentPage } = slice.actions
export default slice.reducer