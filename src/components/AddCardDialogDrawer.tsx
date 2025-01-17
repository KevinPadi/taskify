import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "usehooks-ts"
import { Plus } from "lucide-react"
import AddCardForm from "./AddCardForm"

const TriggerButton = () => {
  return (
    <Button variant="ghost" className="size-8 p-0 text-neutral-200 hover:text-white hover:bg-neutral-800/20">
      <Plus />
    </Button>
  )
}

type AddCardDialogDrawerPropsType = {
  column: string,
  columnId: string
}

export default function AddCardDialogDrawer({column, columnId} : AddCardDialogDrawerPropsType) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <TriggerButton />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">Add new card to {column}</DialogTitle>
            <DialogDescription className="sr-only">
              Create new card in {column}
            </DialogDescription>
          </DialogHeader>
          <AddCardForm columnId={columnId} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <TriggerButton />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new card to {column}</DrawerTitle>
          <DrawerDescription className="sr-only">
            Create new cards in {column}
          </DrawerDescription>
        </DrawerHeader>
        <AddCardForm columnId={columnId} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
