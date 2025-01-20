import { useBoard } from "@/hooks/useBoardContext"
import ProjectCard from "./ProjectCard"
import CreateBoardDialogDrawer from "./CreateBoardDialogDrawer"

const ProjectsCardsCntr = () => {
  const { boards } = useBoard()

  const boardsRemaining = 5 - boards.length
  return (
    <div className="rounded-2xl h-auto sm:h-96 flex flex-1 flex-col gap-4 p-4 w-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-neutral-900 dark:text-neutral-200 text-xl sm:text-2xl font-medium">
                Boards
              </h2>
              <p className="text-neutral-500 dark:text-neutral-500 text-xs sm:text-md">
                {boardsRemaining} boards remaining
              </p>
            </div>
            <CreateBoardDialogDrawer variant="normal" />
            </div>
          <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {
              boards.map((item) => (
                <ProjectCard key={item._id} name={item.name} imageUrl={item.background} _id={item._id} />
              ))
            }
          </div>
      </div>
  )
}

export default ProjectsCardsCntr