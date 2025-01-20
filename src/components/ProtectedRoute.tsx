import { useAuth } from '@/hooks/useAuth'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === false) {
    return (
      <Loader className='animate-spin size-10 mx-auto mt-40 text-white dark:text-black' />
    )
  }

  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
