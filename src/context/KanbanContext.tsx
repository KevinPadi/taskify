import { createContext, useState, ReactNode } from "react"
import axios from "axios"
import { toast } from "material-react-toastify"
import { addCardSchema } from "@/schemas/AddCardSchema"
import { z } from "zod"
import useManageCards, { CardUpdates } from "@/hooks/useManageCards"
import { AddCardFormValues } from "@/hooks/useManageCards"

export type Card = {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  list: string,
  board: string
}

export type Column = {
  _id: string;
  name: string;
  board: string;
  order: number;
}

export interface KanbanContextType {
  cardsData: Card[]
  columnData: Column[]
  createCard: (values: z.infer<typeof addCardSchema>, columnId: string, boardId: string) => Promise<void>
  fetchCards: (boardId: string) => Promise<void>
  fetchColumns: (boardId: string) => Promise<void>
  editCard: (cardToMove: AddCardFormValues, updates: CardUpdates) => Promise<void>
  deleteCard: (cardToDelete: AddCardFormValues) => Promise<void>
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

interface KanbanProviderProps {
  children: ReactNode
}

export const KanbanProvider: React.FC<KanbanProviderProps> = ({ children }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

    const [ cardsData, setCardsData ] = useState<Card[]>([])
    const [ columnData, setColumnData ] = useState<Column[]>([])
  
  const { onSubmitCreateCard, onSubmitGetCards, onSubmitEditCard, onSubmitDeleteCard } = useManageCards()

  const createCard = async (values: AddCardFormValues, columnId: string, boardId: string) => {
    const loadingToastId = toast.loading("Creating card...");
    try {
      const { data } = await onSubmitCreateCard(values, columnId, boardId )
      setCardsData([...cardsData, data])
      toast.update(loadingToastId, {
        render: "Card created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });
  
    } catch (error) {
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
      console.error(error);
    }
  }

  const fetchCards = async ( boardId: string): Promise<void> => {
    try {
          const { data } = await onSubmitGetCards(boardId)
          setCardsData(data)
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message || "An error occurred"
            toast.update('loadingToastId', {
              render: errorMessage,
              type: "error",
              isLoading: false,
              autoClose: 2500,
              closeOnClick: true,
            })
          } else {
            toast.update('loadingToastId', {
              render: "An unexpected error occurred",
              type: "error",
              isLoading: false,
              autoClose: 2500,
              closeOnClick: true,
            })
          }
        }
  }

  const fetchColumns = async (boardId: string) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/list/${boardId}`, { withCredentials: true });
      setColumnData(data)
    } catch (error) {
      console.error(error);
    }
  }

  const editCard = async (cardToMove: AddCardFormValues, updates: CardUpdates) => {
    const loadingToastId = toast.loading("Updating card...");
    try {
      // Actualiza el estado local de la card sin hacer la ordenación aún
      setCardsData((prevCards) => {
        return prevCards.map((card) =>
          card._id === cardToMove.id ? { ...card, ...updates } : card
        );
      });
  
      // Llama al backend para confirmar los cambios
      const res = await onSubmitEditCard(cardToMove, updates);
      if (res.statusText === "OK") {
        // Después de que el backend confirme, reorganizamos las cards
        setCardsData((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card._id === cardToMove.id ? { ...card, ...updates } : card
          );
          
          // Ordena las cards con base en su lógica de prioridad o cualquier otro campo
          const priorityMap = {
            low: 1,
            medium: 2,
            high: 3,
          };
          
          return updatedCards.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority])
        });
  
        toast.update(loadingToastId, {
          render: "Card updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: "An error occurred",
        type: "error",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });
      console.error("Failed to update card:", error);
    }
  };  

  const deleteCard = async (cardToDelete: AddCardFormValues) => {
    const loadingToastId = toast.loading("Deleting card...");
    try {
      await onSubmitDeleteCard(cardToDelete)
      const deletedCardIndex = cardsData.findIndex((card) => card._id === cardToDelete.id)
      const newArray = [
        ...cardsData.slice(0, deletedCardIndex),
        ...cardsData.slice(deletedCardIndex + 1),
      ];
            setCardsData(newArray)
      toast.update(loadingToastId, {
        render: "Card deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });
    } catch (error) {
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
      console.error("Failed to delete card:", error);
    }
  };
  

  return (
    <KanbanContext.Provider value={{ cardsData, columnData, createCard, fetchCards, fetchColumns, editCard, deleteCard }}>
      {children}
    </KanbanContext.Provider>
  )
}

export default KanbanContext