import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuGroup 
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { LogOut, ChevronsUpDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createAvatar } from "@dicebear/core";
import { notionistsNeutral } from "@dicebear/collection";
import { AccountDialogDrawer } from "./AccountDialogDrawer";
import { SidebarMenuButton } from "./ui/sidebar";

const AvatarDropdown = ({ variant }: { variant: "normal" | "sidebar" }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const avatarUri = isAuthenticated && createAvatar(notionistsNeutral, { seed: user?.email }).toDataUri();

  const sidebarVariant = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={avatarUri || undefined} alt={user?.userName || "User"} />
            <AvatarFallback className="rounded-lg">{user?.userName?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.userName || "Guest"}</span>
            <span className="truncate text-xs">{user?.email || "No email"}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatarUri || undefined} alt={user?.userName || "User"} />
              <AvatarFallback className="rounded-lg">{user?.userName?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.userName || "Guest"}</span>
              <span className="truncate text-xs">{user?.email || "No email"}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <AccountDialogDrawer />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const normalVariant = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="p-1 rounded-xl h-fit"
        >
          <Avatar className="size-10 rounded-lg">
            <AvatarImage src={avatarUri || undefined} alt={`Avatar for ${user?.email}`} />
            <AvatarFallback className="rounded-lg">{user?.userName?.[0]?.toUpperCase() || "U"}</AvatarFallback>
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
              <AvatarImage src={avatarUri || undefined} alt={`Avatar for ${user?.email}`} />
              <AvatarFallback className="rounded-lg">{user?.userName?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.userName || "Guest"}</span>
              <span className="truncate text-xs">{user?.email || "No email"}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <AccountDialogDrawer />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return variant === "sidebar" ? sidebarVariant : normalVariant;
};

export default AvatarDropdown;
