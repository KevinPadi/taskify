import { loginFormSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios'


const useLogin = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const userLoginSchema = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  const onSubmitLogin = async (values: z.infer<typeof loginFormSchema>) => {
    return axios.post(`${apiUrl}/api/login`, values, {
      withCredentials: true,
    });
  }
  return {
    userLoginSchema,
    onSubmitLogin
  }
}

export default useLogin