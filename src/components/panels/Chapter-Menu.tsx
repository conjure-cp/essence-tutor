"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type ChapterItem = {
  urlFriendly: string
  title: string
  lessons: { urlFriendly: string; title: string }[]
}

export function ChapterMenu({ chapters }: { chapters: ChapterItem[] }) {
  return (
    <>
      {chapters.map((c) => (
        <Collapsible key={c.urlFriendly}>
          <SidebarMenuItem>
            <CollapsibleTrigger render={<SidebarMenuButton />}>
              <span className="whitespace-normal break-words">{c.title}</span>
              <ChevronRight className="ml-auto shrink-0 transition-transform group-data-[panel-open]/menu-button:rotate-90" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {c.lessons.map((l) => (
                  <SidebarMenuSubItem key={l.urlFriendly}>
                    <SidebarMenuSubButton
                      render={<Link href={`/?chapter=${c.urlFriendly}&lesson=${l.urlFriendly}`} />}
                    >
                      <span>{l.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </>
  )
}