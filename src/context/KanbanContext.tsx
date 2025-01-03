import { createContext, useState, ReactNode } from "react"
import axios from "axios"
import { toast } from "material-react-toastify"
import { addCardSchema } from "@/schemas/AddCardSchema"
import { z } from "zod"
import useManageCards from "@/hooks/useManageCards"
import { AddCardFormValues } from "@/hooks/useManageCards"

export type Card = {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  list: string
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
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

interface KanbanProviderProps {
  children: ReactNode
}

export const KanbanProvider: React.FC<KanbanProviderProps> = ({ children }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

    const [ cardsData, setCardsData ] = useState<Card[]>([])
    const [ columnData, setColumnData ] = useState<Column[]>([])
  
  const { onSubmitCreateCard, onSubmitGetCards,  } = useManageCards()

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
  
      console.log(data, `${apiUrl}/api/card/${columnId}/${boardId}`);
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
    } finally {
      console.log("finally", `${apiUrl}/api/card/${columnId}/${boardId}`);
    }
  }

  const fetchCards = async ( boardId: string): Promise<void> => {
    try {
          const { data } = await onSubmitGetCards(boardId)
          console.log(data)
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
        } finally {
          console.log('finally')
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

  // edit board
  // const editBoard = async ({ values }: ValuesProps): Promise<void> => {
  //   const loadingToastId = toast.loading("Editing board...");
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const { data } = await onSubmitEditBoard(values);
      
  //     setBoards((prev) => 
  //       prev.map(board => board._id === data._id ? data : board)
  //     );

  //     toast.update(loadingToastId, {
  //       render: "Board edited successfully!",
  //       type: "success",
  //       isLoading: false,
  //       autoClose: 2500,
  //       closeOnClick: true,
  //     });
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       const errorMessage = error.response.data.message || "An error occurred";
  //       toast.update(loadingToastId, {
  //         render: errorMessage,
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2500,
  //         closeOnClick: true,
  //       });
  //     } else {
  //       toast.update(loadingToastId, {
  //         render: "An unexpected error occurred",
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2500,
  //         closeOnClick: true,
  //       });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // delete board
  // const deleteBoard = async (id: string): Promise<void> => {
  //   try {
  //     setLoading(true)
  //     const { data } = await axios.delete<Board[]>(`http://localhost:3000/api/board/${id}`, {
  //       withCredentials: true
  //     })
  //     console.log(data)
  //     setBoards((prevBoards) => prevBoards.filter((board) => board._id !== id))
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       const errorMessage = error.response.data.message || "An error occurred"
  //       toast.update('loadingToastId', {
  //         render: errorMessage,
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2500,
  //         closeOnClick: true,
  //       })
  //     } else {
  //       toast.update('loadingToastId', {
  //         render: "An unexpected error occurred",
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2500,
  //         closeOnClick: true,
  //       })
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <KanbanContext.Provider value={{ cardsData, columnData, createCard, fetchCards, fetchColumns }}>
      {children}
    </KanbanContext.Provider>
  )
}

export default KanbanContext