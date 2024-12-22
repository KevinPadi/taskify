import {
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Board } from "@/context/BoardContext";
import { Link } from "react-router-dom";

type NavMainProps = {
  items: Board[];
};

export function NavMain({ items }: NavMainProps) {

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible className="mt-4" key="boards" asChild>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Boards">
              <Link to={"/boards"} className="flex items-center">
                <LayoutGrid />
                <span className="leading-none">Boards</span>
              </Link>
            </SidebarMenuButton>
            {items?.length ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="w-full pe-4">
                    {items?.map((subItem) => (
                      <SidebarMenuItem key={subItem.name}>
                        <SidebarMenuButton asChild>
                          <Link to={`/kanban/${subItem.name}`}>
                            <span>{subItem.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
