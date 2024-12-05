import { createContext, useState, ReactNode } from "react"
import axios from "axios"
import { toast } from "material-react-toastify"
import useManageBoard from "@/hooks/useManageBoard"

interface Board {
  _id: string
  name: string
  background: string
  createdBy: string
}

interface ValuesProps {
  values: {
    _id?: string
    name: string
    background: string
  }
}

export interface BoardContextType {
  boards: Board[]
  createBoard: (values: ValuesProps) => Promise<void>
  fetchBoards: () => Promise<void>
  deleteBoard: (id: string) => Promise<void>
  editBoard: (values: ValuesProps) => Promise<void>
  loading: boolean
  error: string | null
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

interface BoardProviderProps {
  children: ReactNode
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { onSubmitCreateBoard, onSubmitEditBoard } = useManageBoard()

// create new board
const createBoard = async ({ values }: ValuesProps): Promise<void> => {
  const loadingToastId = toast.loading("Creating board...")
  try {
    setLoading(true)
    setError(null)
    const { data } = await  onSubmitCreateBoard(values)
    
    setBoards((prev) => [...prev, data])
    
    toast.update(loadingToastId, {
      render: "Board created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2500,
      closeOnClick: true,
    })
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred"
      toast.update(loadingToastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      })
    } else {
      toast.update(loadingToastId, {
        render: "An unexpected error occurred",
        type: "error",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      })
    }
  } finally {
    setLoading(false)
  }
}

  // fetch all user boards
  const fetchBoards = async (): Promise<void> => {
    try {
      setLoading(true)
      const { data } = await axios.get<Board[]>("http://localhost:3000/api/board", {
        withCredentials: true
      })
      setBoards(data)
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
      setLoading(false)
    }
  }

  // edit board
  const editBoard = async ({ values }: ValuesProps): Promise<void> => {
    const loadingToastId = toast.loading("Editing board...");
    try {
      setLoading(true);
      setError(null);
      const { data } = await onSubmitEditBoard(values);
      
      setBoards((prev) => 
        prev.map(board => board._id === data._id ? data : board)
      );

      toast.update(loadingToastId, {
        render: "Board edited successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2500,
        closeOnClick: true,
      });
    } catch (error: unknown) {
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
    } finally {
      setLoading(false);
    }
  }

  // delete board
  const deleteBoard = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      const { data } = await axios.delete<Board[]>(`http://localhost:3000/api/board/${id}`, {
        withCredentials: true
      })
      console.log(data)
      setBoards((prevBoards) => prevBoards.filter((board) => board._id !== id))
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
      setLoading(false)
    }
  }

  return (
    <BoardContext.Provider value={{ boards, createBoard, fetchBoards, editBoard, deleteBoard, loading, error }}>
      {children}
    </BoardContext.Provider>
  )
}

export default BoardContext