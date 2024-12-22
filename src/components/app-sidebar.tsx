import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Kanban,
} from "lucide-react"

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

// This is sample data.
const data = {
  user: {
    name: "Kevin Padilla",
    email: "kpadilla@taskify.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Taskify",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Boards",
      url: "/",
      icon: Kanban,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { boards, fetchBoards } = useBoard()

  useEffect(() => {
    fetchBoards()
    console.log(boards)
  } ,[])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={boards} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
