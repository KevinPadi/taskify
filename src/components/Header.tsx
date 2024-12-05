import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuGroup } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { UserRound, LogOut } from "lucide-react"

const Header = () => {
  return (
    <header className="w-full fixed top-0 p-2 bg-neutral-100 dark:bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex justify-between">
          <span>
            LOGO 🎉
          </span>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={'lg'}
              variant={'ghost'}
              className="p-1 rounded-xl h-fit"
            >
              <Avatar className="size-10 rounded-lg">
                <AvatarImage src='#' alt='Kevin Padilla' />
                <AvatarFallback className="rounded-lg">KP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src='#' alt='Kevin Padilla' />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Kevin Padilla</span>
                  <span className="truncate text-xs">kevinpadi@gmail.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>
  )
}

export default Header