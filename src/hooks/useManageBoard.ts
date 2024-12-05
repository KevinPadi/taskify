import { z } from "zod";
import axios from 'axios'
import { createBoardSchema } from "@/schemas/CreateBoardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const useManageBoard = (initialValues?: { name: string; background: string }) => {
  const createBoardFormSchema = useForm<z.infer<typeof createBoardSchema>>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: initialValues?.name || "", 
      background: initialValues?.background || "", 
    },
  })

  const onSubmitCreateBoard = async (values: z.infer<typeof createBoardSchema>) => {
    return axios.post('http://localhost:3000/api/board', values, {
      withCredentials: true,
    });
  }

  const onSubmitEditBoard = async (values: z.infer<typeof createBoardSchema>) => {
    return axios.patch(`http://localhost:3000/api/board/${values._id}`, values, {
      withCredentials: true,
    });
  }
  return {
    createBoardFormSchema,
    onSubmitCreateBoard,
    onSubmitEditBoard,
  }
}

export default useManageBoard