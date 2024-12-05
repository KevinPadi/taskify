// import useLogin from '@/hooks/useLogin'
import useRegister from '@/hooks/useRegister'
import { useEffect, createContext, useState, ReactNode } from 'react'
import { LoginData, RegisterData } from '@/types'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import useLogin from '@/hooks/useLogin'
import Cookies from 'js-cookie'
import { VerifyToken } from '@/lib/VerifyToken'

interface AuthProviderProps { 
  children: ReactNode
}

interface AuthContextType {
  user: RegisterData | LoginData | null
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData) => Promise<void>;
  // logout: () => void;
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const { onSubmitRegister } = useRegister()
  const { onSubmitLogin } = useLogin()

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
    const loadingToastId = toast.loading("Creating account...");
    try {
      const res = await onSubmitRegister(data);
  
      if (res.status === 201) {
        toast.update(loadingToastId, {
          render: "Account created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true
        });
        const cookies = Cookies.get()
        localStorage.setItem("token", cookies.token)
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.update(loadingToastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        toast.update(loadingToastId, {
          render: "An unexpected error occurred",
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    }
  };
  
  const login = async (data: LoginData) => {
    const loadingToastId = toast.loading("Login...");
    try {
      const res = await onSubmitLogin(data);
  
      if (res.status === 200) {
        toast.update(loadingToastId, {
          render: "Logged in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true
        });
        const cookies = Cookies.get()
        setUser(res.data);
        setIsAuthenticated(true);
        localStorage.setItem("token", cookies.token)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.update(loadingToastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        toast.update(loadingToastId, {
          render: "An unexpected error occurred",
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
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
  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token")
      if (!token) {
        setIsAuthenticated(false)
        localStorage.removeItem("token")
        setLoading(false)
        return
      }

      try {
        const res = await VerifyToken();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        // logout,
        isAuthenticated,
        // errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext