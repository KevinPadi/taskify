import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addCardSchema } from "@/schemas/AddCardSchema";

export type AddCardFormValues = z.infer<typeof addCardSchema>

export type CardUpdates = {
  title?: string
  priority?: 'low' | 'medium' | 'high'
  column?: string
  board?: string
  id?: string
}

const useManageCards = (initialValues?: { title: string; priority: 'low' | 'medium' | 'high' }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const createCardFormSchema = useForm<AddCardFormValues>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      title: initialValues?.title || "",
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
  

  const onSubmitEditCard = async (cardToMove: AddCardFormValues, updates: CardUpdates ) => {
    const { id, board, column } = cardToMove
    return axios.patch(`${apiUrl}/api/card/${column}/${board}/${id}`, updates, {
      withCredentials: true,
    });
  }

  const onSubmitDeleteCard = async (cardToDelete: CardUpdates) => {
    const { id, board, column } = cardToDelete
    return axios.delete(`${apiUrl}/api/card/${column}/${board}/${id}`, {
      withCredentials: true
    })
  }

  return {
    createCardFormSchema,
    onSubmitGetCards,
    onSubmitCreateCard,
    onSubmitEditCard,
    onSubmitDeleteCard
  };
};

export default useManageCards;
