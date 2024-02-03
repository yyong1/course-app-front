import { Route, Routes } from 'react-router-dom';
import { Home, Chat, Courses } from '../pages';
import { useProtectedRoute } from '../hooks';

const AppRoutes = () => {
  const protectedRoute = useProtectedRoute();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      {protectedRoute && <Route path="/chat" element={<Chat />} />}
    </Routes>
  );
};

export default AppRoutes;
