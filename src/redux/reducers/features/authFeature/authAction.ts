import jwt from 'jsonwebtoken';
import axios from 'axios';
import { userLoaded, logout } from './authSlice';
import { AppDispatch, RootState } from '../../../store';

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.post('/api/login', { username, password });
    dispatch(userLoaded(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const secureRequest = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  if (!token || !jwt.verify(token, import.meta.env.VITE_JWT_SECRET as string)) {
    dispatch(logout());
  } else {
    console.error('Invalid token - auth action');
  }
};

// export const refreshToken = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     const { data } = await axios.get('/api/refresh_token');
//     localStorage.setItem('token', data.token);
//     dispatch(userLoaded(data.user));
//   } catch (error) {
//     dispatch(logout());
//     console.error('Refresh token failed:', error);
//   }
// };
