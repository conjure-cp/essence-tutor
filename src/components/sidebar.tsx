import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

import Link from "next/link"

export function AppSidebar() {
//   const pathname = usePathname()

  return (
    <Sidebar>
        <SidebarHeader>
            <span>Estute</span>

            <SidebarMenuButton>
            <span>Home</span>
            </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                        Select Chapter
                        <ChevronDown className="ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                        <span>Chapter ?: meow</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                    <span>Report a bug</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton render={<Link href="/help" />}>
                    <span>Help</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}