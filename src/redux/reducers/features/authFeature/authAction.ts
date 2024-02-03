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

export const authOauth2Google = createAsyncThunk('auth/oauth2/google', async (payload, { rejectWithValue }) => {
  try {
    console.log('OAuth2 Google Login --->', payload);
    const response = await appAxios.post('/auth/oauth2/google', {
      payload,
    });
    console.log('response data ---> ', response.data);
    const { jwtToken, userId: id, ...restOfUserDetails } = response.data;
    const userDetails = { id, ...restOfUserDetails };
    console.log('OAuth2 Google Login success', userDetails);
    console.log('OAuth2 Google Login success', jwtToken);
    return { user: userDetails, token: jwtToken };
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      console.log('OAuth2 Google Login failed:', error.response.data.message);
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
