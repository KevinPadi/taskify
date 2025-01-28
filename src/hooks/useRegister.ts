import { registerFormSchema } from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, {AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useRegister = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const userRegisterSchema = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })
  
  const onSubmitRegister = (values: z.infer<typeof registerFormSchema>): Promise<AxiosResponse> => {
    return axios.post(`${apiUrl}api/register`, values, {
      withCredentials: true
    });
  };
  
  
  return {
    userRegisterSchema,
    onSubmitRegister
  }
}

export default useRegister