import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import AvatarDropdown from "./AvatarDropdown"

export function NavUser() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AvatarDropdown variant="sidebar" />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
