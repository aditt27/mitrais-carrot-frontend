import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    currentPage: 0,
    totalPages: 0,
    userId: 0
}

const slice = createSlice({
    name: 'bazaarExchangeHistory',
    initialState: initialState,
    reducers: {
        saveExchangeHistoryCurrentPage: (state, action)=> {
            state.data = action.payload.data
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
            state.userId = action.payload.userId
        }
    }
})

export const { saveExchangeHistoryCurrentPage } = slice.actions
export default slice.reducer