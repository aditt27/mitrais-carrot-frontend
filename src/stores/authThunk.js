import { createAsyncThunk } from '@reduxjs/toolkit'
import { removeToken, setToken } from '../utils/HelperFunctions';
import jwt_decode from "jwt-decode";
import apiClient from '../apis';


export const login = createAsyncThunk('auth/login', async (payload, {rejectWithValue}) => {
  try {
    const response = await apiClient.post('/auth/login', payload);
    setToken(response.data);
    payload.navigate('/', { replace: true });
    return jwt_decode(response.data.accessToken);
  } catch (e) {
    return rejectWithValue('Forbidden');
  }
});

export const logout = createAsyncThunk('auth/logout', async (payload) => {
  removeToken();
  payload.navigate('/login', { replace: true });
});

export const setUserData = createAsyncThunk('auth/setUserData', async (payload) => {
  return payload.userData;
});