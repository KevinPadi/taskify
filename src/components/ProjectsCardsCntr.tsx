import { useBoard } from "@/hooks/useBoardContext"
import ProjectCard from "./ProjectCard"

const ProjectsCardsCntr = () => {
  const { boards } = useBoard()

  const boardsRemaining = 5 - boards.length
  return (
    <div className="rounded-2xl h-auto sm:h-96 flex flex-col gap-4 p-4 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-neutral-900 dark:text-neutral-200 text-xl font-medium">Boards</h2>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              {boardsRemaining} boards remaining
            </p>
            </div>
          <div className="grid auto-rows-min gap-4 sm:grid-cols-2 overflow-y-auto">
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