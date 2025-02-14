import { Navigate } from 'react-router';

const PublicRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');

  return !token ? <Component /> : <Navigate to="/tasks" />;
};

export default PublicRoute;