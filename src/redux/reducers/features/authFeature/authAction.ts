// import jwt from 'jsonwebtoken';
// import { logout } from './authSlice';
// import { AppDispatch, RootState } from '../../../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData, RegisterFormData } from '../../../../utils/types';
import { appAxios } from '../../../../services';

export const loginUser = createAsyncThunk('auth/login', async (data: LoginFormData, { rejectWithValue }) => {
  try {
    const response = await appAxios.post('/auth/login', data);
    const { user, token } = response.data;

    // dispatch(userLoaded(user));
    localStorage.setItem('token', token);
    console.log('auth action Login success:', user);

    return user;
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

// export const secureRequest = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//   const token = getState().auth.userToken;
//   if (!token || !jwt.verify(token, import.meta.env.VITE_JWT_SECRET as string)) {
//     dispatch(logout());
//   } else {
//     console.error('Invalid token - auth action');
//   }
// };
