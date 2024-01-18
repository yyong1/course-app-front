import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeAuthModal } from '../../redux/reducers/features/modalFeature/modalSlice';
import { Link } from 'react-router-dom';
import { FormControlLabel, Grid, TextField } from '@mui/material';
import { Checkbox, Stack, DialogContent, DialogTitle, ModalDialog, Modal, FormControl, Button } from '@mui/joy';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type RegisterFormData = {
  email: string;
  password: string;
  username: string;
  // role: 'GUEST' | 'STUDENT' | 'EDUCATOR';
};

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    username: yup.string().min(6, 'Username must be at least 6 characters').max(20).required('Username is required'),
  })
  .required();

function AuthModalDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log('AuthModalDialog is rendered', isOpen);
  }, [isOpen]);

  const onSubmit = (data: RegisterFormData) => {
    console.log('should go to redux and call axios thunk', data);
    // dispatch(register(data));
  };

  return (
    <Modal open={isOpen} onClose={() => dispatch(closeAuthModal())}>
      <ModalDialog>
        <DialogTitle>Create new account</DialogTitle>
        <DialogContent>Fill in your personal information.</DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
            <FormControl error={Boolean(errors.email)}>
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
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
            <Button type="submit">Create account</Button>
            <Grid container direction="column" alignItems="center">
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default AuthModalDialog;
