import { createAsyncThunk } from '@reduxjs/toolkit'
import {removeToken, setToken} from '../utils/HelperFunctions';
import api from '../apis/api';


export const login = createAsyncThunk('auth/login', async (payload) => {
    const response = await api.post('/auth/login', payload);
    setToken(response.data);
    payload.navigate('/', {replace: true});
    return response.data;
});

export const logout = createAsyncThunk('auth/logout', async (payload) => {
    removeToken();
    payload.navigate('/login', {replace: true});
});