import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import ToastService from '../services/toastify/ToastService.ts';

const useProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      ToastService.error('You need to login first');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useProtectedRoute;
