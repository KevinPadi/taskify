import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuGroup } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { UserRound, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { createAvatar } from '@dicebear/core'
import { notionistsNeutral } from '@dicebear/collection'

const AvatarDropdown = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const avatarUri = isAuthenticated && createAvatar(notionistsNeutral, { seed: user?.email }).toDataUri()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'lg'}
          variant={'ghost'}
          className="p-1 rounded-xl h-fit"
        >
          <Avatar className="size-10 rounded-lg">
            <AvatarImage src={avatarUri ? avatarUri : undefined} alt={`Avatar for ${user?.email}`} />
            <AvatarFallback className="rounded-lg">
              {user?.userName?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
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
              <AvatarImage src={avatarUri ? avatarUri : undefined} alt={`Avatar for ${user?.email}`} />
              <AvatarFallback className="rounded-lg">{user?.userName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.userName || 'Guest'}</span>
              <span className="truncate text-xs">{user?.email || 'No email'}</span>
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
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropdown