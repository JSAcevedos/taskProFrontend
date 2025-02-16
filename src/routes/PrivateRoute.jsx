import { Outlet } from 'react-router'
import NotFound from '../pages/NotFound'

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('authToken')

  return token ? <Outlet /> : <NotFound />
}

export default PrivateRoute