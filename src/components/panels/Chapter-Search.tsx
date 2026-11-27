"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { SidebarInput, SidebarMenu,SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export type SearchEntry = {
    chapterUrlFriendly: string
    chapterTitle: string
    lessonUrlFriendly: string
    lessonTitle: string
    content: string
}

type Result = SearchEntry & { snippet: string | null }

const MAX_RESULTS = 8

// about 80 characters of text around the first match in the content
function makeSnippet(content: string, q: string): string | null {
    const i = content.toLowerCase().indexOf(q)
    if (i === -1) return null
    const start = Math.max(0, i - 30)
    const end = Math.min(content.length, i + q.length + 50)
    const text = content.slice(start, end).replace(/\s+/g, " ").trim()
    return (start > 0 ? "…" : "") + text + (end < content.length ? "…" : "")
}

function Highlight({ text, query }: { text: string; query: string }) {
    const i = text.toLowerCase().indexOf(query)
    if (i === -1) return <>{text}</>
    return (
        <>
        {text.slice(0, i)}
        <mark className="rounded-sm bg-yellow-300/40 text-inherit">
            {text.slice(i, i + query.length)}
        </mark>
        {text.slice(i + query.length)}
        </>
    )
}

export function ChapterSearch({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  const results = useMemo<Result[]>(() => {
    if (!q) return []
    return entries
    .filter(
        (e) =>
            e.lessonTitle.toLowerCase().includes(q) ||
            e.chapterTitle.toLowerCase().includes(q) ||
            e.content.toLowerCase().includes(q)
        )
      .map((e) => ({ ...e, snippet: makeSnippet(e.content, q) }))
      // title matches first, then content
      .sort(
        (a, b) =>
          Number(b.lessonTitle.toLowerCase().includes(q)) -
          Number(a.lessonTitle.toLowerCase().includes(q))
      )
      .slice(0, MAX_RESULTS)
  }, [entries, q])

  return (
    <div className="space-y-2">
      <div className="relative">
        <SidebarInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons..."
          aria-label="Search lessons"
          className="pl-8"
        />
        <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>

      {q && (
        <SidebarMenu>
          {results.length === 0 && (
            <p className="px-2 py-1 text-sm text-muted-foreground">No results</p>
          )}

          {results.map((r) => (
            <SidebarMenuItem key={`${r.chapterUrlFriendly}/${r.lessonUrlFriendly}`}>
              <SidebarMenuButton
                className="h-auto flex-col items-start gap-0.5 whitespace-normal py-1.5"
                render={
                  <Link
                    href={`/?chapter=${r.chapterUrlFriendly}&lesson=${r.lessonUrlFriendly}`}
                    onClick={() => setQuery("")}
                  />
                }
              >
                <span className="font-medium">
                  <Highlight text={r.lessonTitle} query={q} />
                </span>
                <span className="text-xs text-muted-foreground">{r.chapterTitle}</span>
                {r.snippet && (
                  <span className="text-xs text-muted-foreground">
                    <Highlight text={r.snippet} query={q} />
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      )}
    </div>
  )
}