import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupContent
} from "@/components/ui/sidebar"

import Link from "next/link"
import { getChapters } from "@/lib/content"
import { ChapterMenu } from "./Chapter-Menu"

export async function AppSidebar() {
    const chapters = await getChapters();

    const items = chapters.map((c) => ({
        slug: c.slug,
        title: c.title,
        lessons: c.lessons.map((l) => ({ slug: l.slug, title: l.title })),
    }))
    
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            <span className="text-lg font-bold">Essence Tutor</span>
        </SidebarHeader>

        <SidebarGroup className="overflow-x-hidden">
            <SidebarGroupContent> 
                <SidebarMenu>
                    <span className="text-lg">Chapters</span>
                </SidebarMenu>
                <SidebarMenu>
                    <ChapterMenu chapters={items} />
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
