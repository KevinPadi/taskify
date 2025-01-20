import { useAuth } from '@/hooks/useAuth'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
