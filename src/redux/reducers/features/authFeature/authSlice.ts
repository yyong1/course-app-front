import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, authOauth2Google } from './authAction';
import { TokenService } from '../../../../services';

const userToken = TokenService.getToken();
const decodedTokenData = TokenService.decodeToken();

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  userInfo: any | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  isAuthenticated: TokenService.isValidToken(),
  loading: false,
  userInfo: decodedTokenData,
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
      TokenService.removeToken();
    },
    resetSuccessAuth: (state) => {
      state.success = false;
      state.isAuthenticated = TokenService.isValidToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.userInfo = user;
        state.loading = false;
        state.userToken = token;
        state.success = true;
        TokenService.saveToken(token);
        state.isAuthenticated = TokenService.isValidToken();
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
      })
      .addCase(authOauth2Google.pending, (state) => {
        state.loading = true;
      })
      .addCase(authOauth2Google.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.userInfo = user;
        state.userToken = token;
        state.isAuthenticated = true;
        state.loading = false;
        state.success = true;
        TokenService.saveToken(token);
      })
      .addCase(authOauth2Google.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, resetSuccessAuth } = authSlice.actions;

export default authSlice.reducer;
