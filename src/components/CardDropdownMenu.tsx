import { MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import EditBoardDialogDrawer from "./EditBoardDialogDrawer";
import { useBoard } from "@/hooks/useBoardContext";

type cardDropdownMenuProps = {
    name: string
    imageUrl: string
    _id: string

} 

const CardDropdownMenu = ({ name, imageUrl, _id }: cardDropdownMenuProps) => {

  const { deleteBoard } = useBoard()

  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="size-7 flex items-center">
              <MoreHorizontal className="stroke-neutral-200" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 rounded-lg">
            <DropdownMenuItem>
              <SquareArrowOutUpRight className="text-neutral-500 dark:text-neutral-400" />
              <span>View Project</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditBoardDialogDrawer name={name} imageUrl={imageUrl} _id={_id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteBoard(_id)}>
              <Trash2 className="text-neutral-500 dark:text-neutral-400" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default CardDropdownMenu