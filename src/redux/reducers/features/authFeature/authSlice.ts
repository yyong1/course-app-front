import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAction';

const userToken = localStorage.getItem('userToken') || null;

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  userInfo: any | null; // Replace 'any' with User type
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  userInfo: null,
  userToken: userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.userToken = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.loading = false;
        state.userToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
