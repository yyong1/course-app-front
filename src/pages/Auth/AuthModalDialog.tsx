import { useEffect, useState } from 'react';
import { Checkbox, Stack, DialogContent, DialogTitle, ModalDialog, Modal, FormControl, Button } from '@mui/joy';
import { FormControlLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeAuthModal } from '../../redux/reducers/features/modalFeature/modalSlice';
import {
  registerUser as registerUserThunk,
  loginUser as loginUserThunk,
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

// custom error fix for FieldErrors
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
  const [isSignUp, setIsSignUp] = useState(authMode === 'signUp');

  useEffect(() => {
    setIsSignUp(authMode === 'signUp');
  }, [authMode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });
  const formErrors = errors as FormErrors;

  useEffect(() => {
    if (success) {
      ToastService.success('Sign up successful! Login in your account.');
      dispatch(closeAuthModal());
    } else if (error) {
      ToastService.error('Error: ' + error);
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    if (success && authMode === 'signIn') {
      ToastService.success('Login successful!');
      dispatch(closeAuthModal());
      navigate('/chat');
      dispatch(resetSuccessAuth());
    }
  }, [success, authMode, dispatch, navigate]);

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    if (authMode === 'signUp') {
      const registerData = { ...data, role: 'STUDENT' } as RegisterFormData;
      dispatch(registerUserThunk(registerData));
    } else {
      dispatch(loginUserThunk(data as LoginFormData));
    }
  };

  return (
    <Modal open={isOpen} onClose={() => dispatch(closeAuthModal())}>
      <ModalDialog>
        <DialogTitle>{isSignUp ? 'Create new account' : 'Sign in to your account'}</DialogTitle>
        <DialogContent>{isSignUp ? 'Fill in your personal information.' : 'Enter your credentials.'}</DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {authMode === 'signUp' && (
              <FormControl error={Boolean(errors.username)}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  {...register('username')}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
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
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default AuthModalDialog;
