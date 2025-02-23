import { Outlet, useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import NotFound from '../pages/NotFound'

const PublicRoute = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    if (token && location.pathname === '/') {
      navigate('/tasks')
    }
  }, [token, location.pathname, navigate])

  return token ? <NotFound /> : <Outlet />
}

export default PublicRoute
