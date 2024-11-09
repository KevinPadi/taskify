import { registerFormSchema } from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useRegister = () => {
  const userRegisterSchema = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  
  const onSubmitRegister = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const response = await axios.post('https://taskify-backend-bi4a.onrender.com/api/register', values);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  return {
    userRegisterSchema,
    onSubmitRegister
  }
}

export default useRegister