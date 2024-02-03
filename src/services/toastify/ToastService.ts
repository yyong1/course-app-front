import { toast } from 'react-toastify';

const ToastService = {
  success(message: string, duration = 5000) {
    toast.success(message, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },

  error(message: string, duration = 5000) {
    toast.error(message, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
};

export default ToastService;
