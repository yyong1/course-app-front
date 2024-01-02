import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import AuthModalDialog from './pages/Auth/AuthModalDialog.tsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <AppRoutes />
        <AuthModalDialog />
      </div>
    </>
  );
}

export default App;
