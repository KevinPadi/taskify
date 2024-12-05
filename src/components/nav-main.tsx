"use client"

import { ChevronRight, EditIcon, Folder, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuAction,
  useSidebar
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url} className="flex items-center">
                  {item.icon && <item.icon />}
                  <span className="leading-none">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="w-full pe-4">
                      {item.items?.map((subItem) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                              <MoreHorizontal />
                              <span className="sr-only">More</span>
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-48"
                            side={isMobile ? "bottom" : "right"}
                            align={isMobile ? "end" : "start"}
                          >
                            <DropdownMenuItem>
                              <Folder className="text-muted-foreground" />
                              <span>View Board</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EditIcon className="text-muted-foreground" />
                              <span>Edit Board</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash2 className="text-muted-foreground" />
                              <span>Delete Board</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
