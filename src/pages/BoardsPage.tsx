import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import BoardsDrawerMenu from "@/components/BoardsDrawerMenu"
import Header from "@/components/Header"
import CreateBoardDialogDrawer from "@/components/CreateBoardDialogDrawer"
import ProjectsCardsCntr from "@/components/ProjectsCardsCntr"
import { useEffect } from "react"
import { useBoard } from "@/hooks/useBoardContext"
import ProjectsLink from "@/components/ProjectsLink"

const BoardsPage = () => {
  const { boards, fetchBoards } = useBoard()

  useEffect(() => {
    fetchBoards()
  }, [])

  return (
    <div className="flex items-center justify-center gap-10 min-h-screen">
      <Header />
      <div className="flex gap-10 w-full sm:w-auto px-2 mt-20">
        <aside className="border hidden h-96 w-56 bg-neutral-950 border-neutral-800 rounded-2xl p-2 sm:flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          <CreateBoardDialogDrawer />
          <ul>
            <h3 className="text-neutral-900 dark:text-neutral-200 font-medium">Boards</h3>
            {/* <NavMain items={data.navMain} /> */}
            {boards.map((item) => (
              <li key={item._id}>
                <ProjectsLink item={item} />
              </li>
          ))}
          </ul>
        </div>
        <div>
          <Button variant={"ghost"} className="text-neutral-400 flex items-center justify-start gap-3 w-full" >
            <Send className="size-4" />
            Feedback
          </Button>
        </div>
      </aside>
      <ProjectsCardsCntr />
      </div>
      <BoardsDrawerMenu />
    </div>
  )
}

export default BoardsPage