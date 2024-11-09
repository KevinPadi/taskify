// import useLogin from '@/hooks/useLogin'
import useRegister from '@/hooks/useRegister'
import { useEffect, createContext, useState, ReactNode } from 'react'
import { RegisterData } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: RegisterData | null
  register: (data: RegisterData) => Promise<{ error: unknown; } | undefined>
  // login: (data: RegisterData) => Promise<void>;
  // logout: () => void;
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  // const [loading, setLoading] = useState(true)
  const { onSubmitRegister } = useRegister()

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  const register = async (data: RegisterData) => {
    try {
      const res = await onSubmitRegister(data);
      if (res.status === 201) {
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: error.message
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        return {
          error: error.message
        }
      }
    }
  };
  
  
  
  

  // const signin = async (user) => {
  //   try {
  //     const res = await loginRequest(user)
  //     setUser(res.data)
  //     setIsAuthenticated(true)
  //   } catch (error) {
  //     console.log(error)
  //     // setErrors(error.response.data.message);
  //   }
  // }

  // const logout = async () => {
  //   try {
  //     await logoutRequest()
  //     Cookies.remove('token')
  //     setUser(null)
  //     setIsAuthenticated(false)
  //     // Aquí puedes añadir lógica adicional, como redirigir al usuario a la página de inicio de sesión
  //   } catch (error) {
  //     console.error('Error al hacer logout:', error)
  //   }
  // }
  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const cookies = Cookies.get()
  //     if (!cookies.token) {
  //       setIsAuthenticated(false)
  //       setLoading(false)
  //       return
  //     }

  //     try {
  //       const res = await verifyTokenRequest(cookies.token)
  //       console.log(res)
  //       if (!res.data) return setIsAuthenticated(false)
  //       setIsAuthenticated(true)
  //       setUser(res.data)
  //       setLoading(false)
  //     } catch (error) {
  //       setIsAuthenticated(false)
  //       setLoading(false)
  //     }
  //   }
  //   checkLogin()
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        // signin,
        // logout,
        isAuthenticated,
        // errors,
        // loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext