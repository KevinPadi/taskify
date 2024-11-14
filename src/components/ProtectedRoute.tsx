import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === false) {
    return <p>Loading...</p>
  }

  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
