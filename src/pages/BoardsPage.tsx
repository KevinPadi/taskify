import Header from "@/components/Header"
import ProjectsCardsCntr from "@/components/ProjectsCardsCntr"
import { useEffect } from "react"
import { useBoard } from "@/hooks/useBoardContext"

const BoardsPage = () => {
  const { fetchBoards } = useBoard()
  useEffect(() => {
    fetchBoards()
   console.log('hizo fetch de boards')
  }, [])

  return (
    <div className="flex items-center justify-center gap-10 min-h-screen">
      <Header />
      <div className="flex gap-10 w-full sm:w-1/2 px-2 mt-20">
        <ProjectsCardsCntr />
      </div>
    </div>
  )
}

export default BoardsPage