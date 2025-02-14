import { Navigate } from 'react-router';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;