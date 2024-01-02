import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Chat from '../pages/Chat/Chat';
import { useAppSelector } from '../redux/hooks.ts';

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      {isAuthenticated && <Route path="/chat" element={<Chat />} />}
    </Routes>
  );
};

export default AppRoutes;
