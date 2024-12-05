import { Menu, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Drawer, DrawerTrigger, DrawerTitle, DrawerContent, DrawerDescription, DrawerFooter,  } from "./ui/drawer"
import CreateBoardDialogDrawer from "./CreateBoardDialogDrawer"
import { useBoard } from "@/hooks/useBoardContext"
import CardDropdownMenu from "./CardDropdownMenu"

const BoardsDrawerMenu = () => {
  const { boards } = useBoard()
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" size={'icon'} className="flex sm:hidden fixed bottom-4 right-4">
          <Menu size={64} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
          <DrawerTitle className="text-neutral-900 dark:text-neutral-200 font-medium">
            Boards
          </DrawerTitle>
          <DrawerDescription className="sr-only">Create new board</DrawerDescription>
          <ul>
              {/* <NavMain items={data.navMain} /> */}
              {boards.map((item) => (
              <li key={item._id} className="flex items-center justify-between group">
                <Button variant={'link'} asChild className="text-neutral-900 dark:text-neutral-300 font-normal">
                  <a href={item._id}> 
                    <span>{item.name}</span>
                  </a>
                </Button>
                <CardDropdownMenu name={item.name} imageUrl={item.background} _id={item._id} />
              </li>
            ))}
            </ul>
            <Button variant={"ghost"} className="text-neutral-400 flex items-center justify-start gap-3 w-full" >
              <Send className="size-4" />
              Feedback
            </Button>
          </div>
          <DrawerFooter>
            <CreateBoardDialogDrawer />
          </DrawerFooter>
        </div>
      </DrawerContent>
      </Drawer>
  )
}

export default BoardsDrawerMenu