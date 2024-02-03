import { useEffect, useState } from 'react';
import { Checkbox, Stack, DialogContent, DialogTitle, ModalDialog, Modal, FormControl, Button } from '@mui/joy';
import { FormControlLabel, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeAuthModal } from '../../redux/reducers/features/modalFeature/modalSlice';
import {
  registerUser as registerUserThunk,
  loginUser as loginUserThunk,
  authOauth2Google as authOauth2GoogleThunk,
} from '../../redux/reducers/features/authFeature/authAction';

import {
  // Link,
  useNavigate,
} from 'react-router-dom';
import { useForm, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginFormData, RegisterFormData } from '../../utils/types';
import ToastService from '../../services/toastify/ToastService.ts';
import { resetSuccessAuth } from '../../redux/reducers/features/authFeature/authSlice.ts';
import { TokenService } from '../../services';
import { useGoogleLogin } from '@react-oauth/google';

type FormErrors = FieldErrors<{
  username?: string;
  email?: string;
  password?: string;
}>;

const signUpSchema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    username: yup.string().min(6, 'Username must be at least 6 characters').max(20).required('Username is required'),
  })
  .required();

const signInSchema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

function AuthModalDialog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, error } = useAppSelector((state) => state.auth);
  const { isOpen, authMode } = useAppSelector((state) => state.modal);
  const [isSignUp, setIsSignUp] = useState<boolean>(authMode === 'signUp');

  // let isSignUp = authMode === 'signUp';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const formErrors = errors as FormErrors;

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    if (authMode === 'signUp') {
      const registerData = { ...data, role: 'STUDENT' } as RegisterFormData;
      dispatch(registerUserThunk(registerData));
    } else {
      console.log('Token validation --> ', TokenService.isValidToken());
      if (!TokenService.isValidToken()) TokenService.removeToken();
      dispatch(loginUserThunk(data as LoginFormData));
    }
  };

  const authGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(authOauth2GoogleThunk(tokenResponse));
      console.log(tokenResponse);
      setIsSignUp(false);
      console.log('isSignUp authGoogle: ', isSignUp);
    },
    flow: 'auth-code',
  });

  useEffect(() => {
    if (success) {
      const message = isSignUp ? 'Sign up successful! Login in your account.' : 'Login successful!';
      ToastService.success(message);
      dispatch(closeAuthModal());
      console.log('isSignUp useEffect: ', isSignUp);
      if (!isSignUp) {
        navigate('/chat');
        dispatch(resetSuccessAuth());
      }
    } else if (error) {
      ToastService.error(`Error: ${error}`);
    }
  }, [success, error, authMode, dispatch, navigate, authGoogle]);
  return (
    <Modal open={isOpen} onClose={() => dispatch(closeAuthModal())}>
      <ModalDialog>
        <DialogTitle>{isSignUp ? 'Create new account' : 'Sign in to your account'}</DialogTitle>
        <DialogContent>{isSignUp ? 'Fill in your personal information.' : 'Enter your credentials.'}</DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {authMode === 'signUp' && (
              <FormControl error={Boolean(formErrors.username)}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  {...register('username')}
                  error={Boolean(formErrors.username)}
                  helperText={formErrors.username?.message}
                />
              </FormControl>
            )}
            <FormControl error={Boolean(formErrors.email)}>
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                {...register('email')}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email?.message}
              />
            </FormControl>
            <FormControl error={Boolean(errors.password)}>
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
            {/*  <Button type="submit">Create account</Button>*/}
            {/*  <Grid container direction="column" alignItems="center">*/}
            {/*    <Grid item xs>*/}
            {/*      <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>*/}
            {/*        Forgot password?*/}
            {/*      </Link>*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*      <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>*/}
            {/*        /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
            {/*        Don't have an account? Sign In*/}
            {/*      </Link>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            <Button type="submit">{authMode === 'signUp' ? 'Create account' : 'Sign in'}</Button>
            {/*<Button onClick={toggleAuthMode}>*/}
            {/*  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}*/}
            {/*</Button>*/}
            <Typography>OR</Typography>
            <Button onClick={() => authGoogle()}>Auth with Google</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default AuthModalDialog;
