import { createAsyncThunk } from '@reduxjs/toolkit'
import {getAccessToken, removeToken} from '../utils/HelperFunctions';
import api from '../apis/api';

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