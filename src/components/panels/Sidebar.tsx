import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroupLabel
} from "@/components/ui/sidebar"

import Link from "next/link"
import { getChapters } from "@/lib/chapters"

export function AppSidebar() {
  const chapters = getChapters()
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            <SidebarMenuButton render={<Link href="/" />}>
                <span className="text-lg font-bold">Essence Tutor</span>
            </SidebarMenuButton>
        </SidebarHeader>

        <SidebarGroup className="overflow-x-hidden">
            <SidebarGroupContent> 
                <SidebarMenu>
                    <span className="text-lg">Chapters</span>
                </SidebarMenu>
                <SidebarMenu>
                {chapters.map((c) => (
                    <SidebarMenuItem key={c.urlFriendly}>
                        <span className="whitespace-normal break-words">{c.title}</span>

                    <SidebarMenuSub>
                        {c.lessons.map((l) => (
                        <SidebarMenuSubItem key={l.urlFriendly}>
                            <SidebarMenuSubButton
                            render={
                                <Link href={`/?chapter=${c.urlFriendly}&lesson=${l.urlFriendly}`} />
                            }
                            >
                            <span>{l.title}</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton render={<Link href={"/help"} />} >
                    <span>Help</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}