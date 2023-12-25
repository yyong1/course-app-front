import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './pages/About/About.tsx';
import { Chat } from './pages';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
