import { Outlet } from 'react-router';
import NotFound from '../pages/NotFound';

const PublicRoute = () => {
  const token = localStorage.getItem('token');

  return !token ? <Outlet /> : <NotFound />;
};

export default PublicRoute;