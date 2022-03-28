import { createSlice } from '@reduxjs/toolkit'
import { login, logout} from './authThunk';

const initialState = {
    token: null,
    loading: false,
    userData: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [logout.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = {};
            state.token = null;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            const {accessToken, user} = action.payload;
            state.token = accessToken;
            state.userData = user;
            state.loading = false;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
        },
    },
})


export const {} = authSlice.actions;

export default authSlice.reducer;