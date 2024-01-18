import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks.ts';
import { Home, Chat, About, Courses } from '../pages';

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      {isAuthenticated && <Route path="/chat" element={<Chat />} />}
    </Routes>
  );
};

export default AppRoutes;
