import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './pages/About.tsx';

function App() {
  return (
        <>
            <Navbar/>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/about" element={<About/>}/>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </>
  );
}

export default App;
