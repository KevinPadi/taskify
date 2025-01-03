import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addCardSchema } from "@/schemas/AddCardSchema";

export type AddCardFormValues = z.infer<typeof addCardSchema>;

const useManageCards = (initialValues?: { title: string; description?: string; priority: 'low' | 'medium' | 'high' }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const createCardFormSchema = useForm<AddCardFormValues>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      priority: initialValues?.priority || "low",
    },
  })

  const onSubmitGetCards = async (boardId: string) => {
    return axios.get(`${apiUrl}/api/card/${boardId}`, { withCredentials: true });

  }

  const onSubmitCreateCard = async (values: AddCardFormValues, columnId: string, boardId: string) => {
    return await axios.post(`${apiUrl}/api/card/${columnId}/${boardId}`, values, {
      withCredentials: true,
    });
  };
  

  const onSubmitEditCard = async (values: AddCardFormValues) => {
    return axios.patch(`http://localhost:3000/api/profile/${values.title}`, values, {
      withCredentials: true,
    });
  };

  return {
    createCardFormSchema,
    onSubmitGetCards,
    onSubmitCreateCard,
    onSubmitEditCard,
  };
};

export default useManageCards;
