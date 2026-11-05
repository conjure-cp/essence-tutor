import {
  Sidebar,
  SidebarContent,
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
    <Sidebar>
        <SidebarHeader>
            <span>Estute</span>

            <SidebarMenuButton render={<Link href="/" />}>
            <span>Home</span>
            </SidebarMenuButton>
        </SidebarHeader>

        <SidebarGroup>
            <SidebarGroupLabel className="h-10 text-lg font-bold text-foreground">Chapters</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {chapters.map((c) => (
                    <SidebarMenuItem key={c.urlFriendly}>
                    <SidebarMenuButton
                        render={
                        <Link
                            href={`/?chapter=${c.urlFriendly}&lesson=${c.lessons[0]?.urlFriendly ?? ""}`}
                        />
                        }
                    >
                        <span>{c.title}</span>
                    </SidebarMenuButton>

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