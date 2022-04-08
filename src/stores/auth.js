import { createSlice } from '@reduxjs/toolkit'
import { login, logout, setUserData} from './authThunk';

const initialState = {
    userData: {},
    rejected: false
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
        [login.rejected]: (state, action) => {
          state.rejected = true;
        },
        [setUserData.fulfilled]: (state, action) => {
          state.userData = action.payload;
      },
    },
})


export const {} = authSlice.actions;

export default authSlice.reducer;