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
    try {
      const response = await axios.post('https://taskify-backend-bi4a.onrender.com/api/login', values);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  return {
    userLoginSchema,
    onSubmitLogin
  }
}

export default useLogin