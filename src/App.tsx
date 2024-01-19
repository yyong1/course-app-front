import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import AuthModalDialog from './pages/Auth/AuthModalDialog.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <AppRoutes />
        <AuthModalDialog />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
