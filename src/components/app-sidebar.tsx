import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarLogoHeader } from "@/components/SidebarHeader"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useBoard } from "@/hooks/useBoardContext"
import { useEffect } from "react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { boards, fetchBoards } = useBoard()

  useEffect(() => {
    fetchBoards()
  } ,[])

  return (
    <Sidebar collapsible="icon" {...props} className="border-transparent">
      <SidebarHeader>
        <SidebarLogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={boards} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
