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
// import { Span } from "next/dist/trace"

export function AppSidebar() {
  const chapters = getChapters()
// TODO: where should i put home
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            <span className="text-lg font-bold">Essence Tutor</span>

            <SidebarMenuButton render={<Link href="/" />}>
                <span>Home</span>
            </SidebarMenuButton>
        </SidebarHeader>

        <SidebarGroup className="overflow-x-hidden">
            <SidebarGroupContent> 
                <SidebarMenuButton render={<Link href="/" />}>
                <span>Home</span>
                </SidebarMenuButton>

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