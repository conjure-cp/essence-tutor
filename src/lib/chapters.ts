import fs from "node:fs"
import path from "node:path"

const CONTENT_DIR = path.join(process.cwd(), "public/content")

export type Lesson = {
  urlFriendly: string  // comes from filename 
  title: string     // shown in the sidebar, comes from first #heading
  filename: string  // path to md file
}

export type Chapter = {
  urlFriendly: string   // from folder names
  title: string     
  filename: Lesson[]  
}

function prettify(name: string) {
  const words = name.replace(/\.md$/, "").replace(/^\d+-/, "").replace(/-/g, " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export function getChapters(): Chapter[] {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((folder) => {
      const lessons = fs
        .readdirSync(path.join(CONTENT_DIR, folder))
        .filter((f) => f.endsWith(".md")) // ignores the .essence files
        .sort()
        .map((f) => {
          const text = fs.readFileSync(path.join(CONTENT_DIR, folder, f), "utf8")
          const heading = text.match(/^#\s+(.+)$/m)
          return {
            urlFriendly: f.replace(/\.md$/, ""),
            title: heading ? heading[1].trim() : prettify(f),
            filename: `public/content/${folder}/${f}`,
          }
        })

      return { urlFriendly: folder, title: prettify(folder), lessons }
    })
}
