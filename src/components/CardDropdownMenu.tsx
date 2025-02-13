import { MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import EditBoardDialogDrawer from "./EditBoardDialogDrawer";
import { useBoard } from "@/hooks/useBoardContext";
import { Link } from "react-router-dom";

type cardDropdownMenuProps = {
    name: string
    imageUrl: string
    _id: string

} 

const CardDropdownMenu = ({ name, imageUrl, _id, onInteraction }: cardDropdownMenuProps & { onInteraction?: (e: React.MouseEvent) => void }) => {
  const { deleteBoard } = useBoard();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={"ghost"} 
          size={"icon"} 
          className="size-7 flex items-center"
          onClick={(e) => onInteraction && onInteraction(e)}
        >
          <MoreHorizontal className="stroke-neutral-200" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-48 rounded-lg"
        onClick={(e) => onInteraction && onInteraction(e)}
        align="end"
      >
        <DropdownMenuItem onClick={(e) => onInteraction && onInteraction(e)}>
          <SquareArrowOutUpRight className="text-neutral-500 dark:text-neutral-400" />
          <Link
            to={`/kanban/${name}/${_id}`}
            state={{ imageUrl }}
          >
            Go to board
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={(e) => onInteraction && onInteraction(e)}>
          <EditBoardDialogDrawer name={name} imageUrl={imageUrl} _id={_id} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={(e) => {
            if(onInteraction) onInteraction(e) 
            deleteBoard(_id);
          }}
          className="hover:cursor-pointer"
        >
          <Trash2 className="text-neutral-500 dark:text-neutral-400" />
          <span>Delete board</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropdownMenu