import { createSlice } from '@reduxjs/toolkit'
import { login, logout} from './authThunk';

const initialState = {
    userData: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [logout.fulfilled]: (state, action) => {
            state.userData = {};
        },
        [login.fulfilled]: (state, action) => {
            state.userData = action.payload;
        },
    },
})


export const {} = authSlice.actions;

export default authSlice.reducer;