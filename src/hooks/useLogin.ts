import { loginFormSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios'


const useLogin = () => {
  const userLoginSchema = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmitLogin = async (values: z.infer<typeof loginFormSchema>) => {
    return axios.post('http://localhost:3000/api/login', values, {
      withCredentials: true,
    });
  }
  return {
    userLoginSchema,
    onSubmitLogin
  }
}

export default useLogin