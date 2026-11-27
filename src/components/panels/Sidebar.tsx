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
import { ChapterSearch } from "./Chapter-Search"

export async function AppSidebar() {
    const chapters = await getChapters();

    const items = chapters.map((c) => ({
        urlFriendly: c.urlFriendly,
        title: c.title,
        lessons: c.lessons.map((l) => ({ urlFriendly: l.urlFriendly, title: l.title })),
    }))

    const searchEntries = chapters.flatMap((c) => c.lessons.map((l) => ({
        chapterUrlFriendly: c.urlFriendly,
        chapterTitle: c.title,
        lessonUrlFriendly: l.urlFriendly,
        lessonTitle: l.title,
        content: l.value,
    })))
    
    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <span className="text-lg font-bold">Essence Tutor</span>
                 <ChapterSearch entries={searchEntries} />
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
