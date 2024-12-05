import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerHeader } from "./ui/drawer"
import { Edit2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useMediaQuery } from "usehooks-ts"
import EditBoardForm from "./EditBoardForm"

type EditBoardDialogDrawerProps = {
  name: string
  imageUrl: string
  _id: string
}

const EditBoardDialogDrawer = ({ name, imageUrl, _id }: EditBoardDialogDrawerProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 500px)")
 
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className="w-full flex items-center justify-start px-2 py-1.5 h-fit font-normal rounded-sm">
            <Edit2Icon className="text-neutral-500 dark:text-neutral-400" />
              Edit board
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-100 text-center">Edit board</DialogTitle>
            <DialogDescription className="sr-only">Edit board</DialogDescription>
          </DialogHeader>
          <EditBoardForm name={name} imageUrl={imageUrl} _id={_id} />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={'ghost'} className="w-full flex items-center justify-start px-2 py-1.5 h-fit font-normal rounded-sm">
          <Edit2Icon className="text-neutral-500 dark:text-neutral-400" />
            Edit board
        </Button>       
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-neutral-900 dark:text-neutral-100 text-center">Edit board</DrawerTitle>
          <DrawerDescription className="sr-only">Edit board</DrawerDescription>
        </DrawerHeader>
        <EditBoardForm name={name} imageUrl={imageUrl} _id={_id} className="p-4" />
      </DrawerContent>
    </Drawer>
  )
}

export default EditBoardDialogDrawer