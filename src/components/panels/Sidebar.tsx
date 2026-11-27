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
import { getChapters } from "@/lib/content"


export async function AppSidebar() {
    const chapters = await getChapters();
    
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            <span>Essence Tutor</span>

            <SidebarMenuButton render={<Link href="/" />}>
            <span>Home</span>
            </SidebarMenuButton>
        </SidebarHeader>

        <SidebarGroup className="overflow-x-hidden">
            <SidebarGroupLabel className="h-10 text-lg font-bold text-foreground">Chapters</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {chapters.map((c) => (
                    <SidebarMenuItem key={c.slug}>
                        <span className="whitespace-normal break-words">{c.title}</span>

                    <SidebarMenuSub>
                        {c.lessons.map((l) => (
                        <SidebarMenuSubItem key={l.slug}>
                            <SidebarMenuSubButton
                            render={
                                <Link href={`/?chapter=${c.slug}&lesson=${l.slug}`} />
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
