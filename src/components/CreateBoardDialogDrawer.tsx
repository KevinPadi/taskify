import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerHeader } from "./ui/drawer"
import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import CreateBoardForm from "./CreateBoardForm"
import { useMediaQuery } from "usehooks-ts"
import { useBoard } from "@/hooks/useBoardContext"

const CreateBoardDialogDrawer = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 500px)")
  const { boards } = useBoard()

 
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={`w-full ${5 - boards.length === 0 && 'opacity-60 cursor-not-allowed pointer-events-none'}`}>
            <PlusIcon />
            Add new board
          </Button>        
        </DialogTrigger>
        <DialogContent className="max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-100 text-center">Create board</DialogTitle>
            <DialogDescription className="sr-only">Create a new board</DialogDescription>
          </DialogHeader>
          <CreateBoardForm />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={`w-full ${boards.length}`}>
          <PlusIcon />
          Add new board
        </Button>       
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-neutral-900 dark:text-neutral-100 text-center">Create board</DrawerTitle>
          <DrawerDescription className="sr-only">Create a new board</DrawerDescription>
        </DrawerHeader>
        <CreateBoardForm className="p-4" />
      </DrawerContent>
    </Drawer>
  )
}

export default CreateBoardDialogDrawer