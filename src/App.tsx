import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
