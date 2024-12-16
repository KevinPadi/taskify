// import useLogin from '@/hooks/useLogin'
import useRegister from '@/hooks/useRegister'
import { useEffect, createContext, useState, ReactNode } from 'react'
import { LoginData, RegisterData } from '@/types'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import useLogin from '@/hooks/useLogin'
import Cookies from 'js-cookie'
import logoutRequest from '@/hooks/useLogout'
import { VerifyToken } from '@/lib/VerifyToken'

interface User {
  id: string;
  userName: string;
  email: string;
  
}

interface AuthProviderProps { 
  children: ReactNode
}

interface AuthContextType {
  user: User | null
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const { onSubmitRegister } = useRegister()
  const { onSubmitLogin } = useLogin()
  
  // limpiar errores después de 5 segundos
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
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
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
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        console.log(JSON.stringify(res.data))
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

  const logout = async () => {
    const loadingToastId = toast.loading("Logging out...");

    try {
      await logoutRequest();
      Cookies.remove('token');

      setUser(null);
      setIsAuthenticated(false);

      toast.update(loadingToastId, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });

      window.location.href = '/' // O puedes usar react-router para redirigir

    } catch (error) {
      console.error('Error during logout:', error);

      toast.update(loadingToastId, {
        render: "An error occurred during logout.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });
    }
  }

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
        const res = await VerifyToken()
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data)
          console.log(res.data  )
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error)
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
        logout,
        // errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext