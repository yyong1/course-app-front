import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData, RegisterFormData } from '../../../../utils/types';
import { appAxios } from '../../../../services';

export const loginUser = createAsyncThunk('auth/login', async (data: LoginFormData, { rejectWithValue }) => {
  try {
    const response = await appAxios.post('/auth/login', data);
    const { jwt, ...user } = response.data;

    return { user, token: jwt };
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      console.log('auth action Login failed:', error.response.data.message);
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const registerUser = createAsyncThunk('auth/register', async (data: RegisterFormData, { rejectWithValue }) => {
  try {
    await appAxios.post('/auth/register', data);
    console.log('auth action Register success', data);
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      console.log('auth action Register failed:', error.response.data.message);
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
