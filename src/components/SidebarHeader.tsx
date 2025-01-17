import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import CreateBoardDialogDrawer from "./CreateBoardDialogDrawer"

export function SidebarLogoHeader() {
  const { state, open } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem className="space-y-4">
        <div className="flex items-center gap-2 p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-300 text-black font-bold">
            T
          </div>
          <span className="font-semibold">Taskify</span>
        </div>
        <CreateBoardDialogDrawer variant='sidebar' open={open} state={state} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
