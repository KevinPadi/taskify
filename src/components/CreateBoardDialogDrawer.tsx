import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useMediaQuery } from "usehooks-ts";
import { useBoard } from "@/hooks/useBoardContext";
import { PlusIcon } from "lucide-react";
import CreateBoardForm from "./CreateBoardForm";

interface CreateBoardDialogDrawerProps {
  variant?: "normal" | "sidebar";
  open?: boolean;
  state: "expanded" | "collapsed"
}

interface TriggerButtonProps {
  variant: "normal" | "sidebar";
  disabled: boolean;
  isOpen: boolean;
}

const TriggerButton = ({ variant, disabled }: TriggerButtonProps) => {
  if (variant === "sidebar") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`size-8 bg-neutral-950 dark:bg-neutral-200 text-white dark:text-black ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add New Board</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent  side="right" className="-translate-y-4">
          Add New Board
        </TooltipContent>
      </Tooltip>
    );
  }

  // Normal variant
  return (
    <Button
      className={`w-full ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <PlusIcon className="mr-2 h-4 w-4" />
      Add new board
    </Button>
  );
};

const CreateBoardDialogDrawer = ({ variant = "normal", state }: CreateBoardDialogDrawerProps) => {
  const [isOpen, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { boards } = useBoard();

  const isDisabled = boards.length === 5;
  console.log(isDisabled) 
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {variant === "sidebar" && state === "expanded" ? (
            <Button variant="default" size="sm" className={`w-full ${
              isDisabled ? "opacity-60 cursor-not-allowed" : ""
            }`}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Board
            </Button>
          ) : (
            <TriggerButton variant={variant} disabled={isDisabled} isOpen={state === "expanded"} />
          )}
        </DialogTrigger>
        <DialogContent className="max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-100 text-center">
              Create board
            </DialogTitle>
            <DialogDescription className="sr-only">Create a new board</DialogDescription>
          </DialogHeader>
          <CreateBoardForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {variant === "sidebar" && (state === "expanded" || !isDesktop) ? (
          <Button variant="default" size="sm" className={`w-full ${
            isDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Board
          </Button>
        ) : (
          <TriggerButton variant={variant} disabled={isDisabled} isOpen={state === "expanded"} />
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-neutral-900 dark:text-neutral-100 text-center">
            Create board
          </DrawerTitle>
          <DrawerDescription className="sr-only">Create a new board</DrawerDescription>
        </DrawerHeader>
        <CreateBoardForm className="p-4" />
      </DrawerContent>
    </Drawer>
  );
};

export default CreateBoardDialogDrawer;

