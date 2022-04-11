import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import apiClient from '../apis';

export const changePassword = createAsyncThunk('user/changePassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(`/user/change-password?old_password=${payload.oldPassword}&new_password=${payload.newPassword}`);
    payload.navigate('/', { replace: true });
    return response.data;
  } catch (e) {
    return rejectWithValue('Old password not match');
  }
});


const initialState = {
  profile: {},
  rejected: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload.profile
    }
  },
  extraReducers: {
    [changePassword.fulfilled]: (state, action) => { },
    [changePassword.rejected]: (state, action) => {
      state.rejected = true;
    }
  },
})

export const { saveProfile } = userSlice.actions;
export default userSlice.reducer;