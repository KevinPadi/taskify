import {
  ChevronRight,
  Activity,
  Kanban,
  Send,
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
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

type NavMainProps = {
  items: Board[];
};

export function NavMain({ items }: NavMainProps) {

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible key="boards" asChild>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Boards">
              <Link to={"/boards"} className="flex items-center">
                <Kanban />
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
                  <SidebarMenuSub className="">
                    {items?.map((subItem) => (
                      <SidebarMenuItem key={subItem.name}>
                        <SidebarMenuButton asChild>
                          <Link to={`/kanban/${subItem.name}`}>
                            <span className="dark:text-neutral-300">{subItem.name}</span>
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
        <SidebarMenuButton asChild tooltip="Activity">
          {/* <Link to={"/boards"} className="flex items-center"> */}
          <Button variant={'ghost'} disabled className="w-full flex justify-start font-normal">
            <Activity />
            <span className="leading-none">Activity</span>
          </Button>
          {/* </Link> */}
        </SidebarMenuButton>
        <SidebarMenuButton asChild tooltip="Feedback">
          <Button variant={'ghost'}>
            <a href="https://github.com/KevinPadi/taskify/issues/new?title=Feedback&body=Describe%20your%20feedback%20here." target="_blank" rel="noopener noreferrer" className="flex justify-start font-normal w-full gap-2">
              <Send />
              <span className="leading-none">Feedback</span>
            </a>
          </Button>
        </SidebarMenuButton>
        <ModeToggle variant="sidebar" />
      </SidebarMenu>
    </SidebarGroup>
  );
}
