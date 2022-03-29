import { createAsyncThunk } from '@reduxjs/toolkit'
import {getAccessToken, removeToken} from '../utils/HelperFunctions';
import api from '../apis/api';
import { createSlice } from '@reduxjs/toolkit'

const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, {rejectWithValue}) => {
  try{
      const accessToken = getAccessToken();
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      const response = await api.get('/user');
      return {...response.data, accessToken};
  }catch(e){
      removeToken();
      return rejectWithValue('');
  }
});

export const changePassword = createAsyncThunk('user/changePassword', async (payload, {rejectWithValue}) => {
  try{
      const accessToken = getAccessToken();
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      const response = await api.post(`/user/change-password?old_password=${payload.oldPassword}&new_password=${payload.newPassword}`);
      payload.navigate('/', {replace: true});
      return response.data;
  }catch(e){
      removeToken();
      return rejectWithValue('');
  }
});


const initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [changePassword.fulfilled]: (state, action) => {},
    },
})


export const {} = userSlice.actions;

export default userSlice.reducer;