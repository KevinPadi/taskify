import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import CreateBoardDialogDrawer from "./CreateBoardDialogDrawer"
import Logo from "./Logo"

export function SidebarLogoHeader() {
  const { state, open } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Logo className="aspect-square" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-lg">Taskify</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <CreateBoardDialogDrawer variant='sidebar' open={open} state={state} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
