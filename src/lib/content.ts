import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content")

export interface Lesson {
  slug: string,  // url-friendly string
  title: string,  // lesson name
  value: string,  // content of md file
};

export interface Chapter {
  slug: string,  // url-friendly string
  title: string,  // chapter name
  lessons: Lesson[]  // contained lessons
};

function prettify(name: string) {
  const words = name.replace(/\.md$/, "").replace(/^\d+-/, "").replace(/-/g, " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export const getChapters = async (): Promise<Chapter[]> => {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((folder) => {
      const lessons = fs
        .readdirSync(path.join(CONTENT_DIR, folder))
        .filter((f) => f.endsWith(".md")) // ignores the .essence files (for now)
        .sort()
        .map((f) => {
          const text = fs.readFileSync(path.join(CONTENT_DIR, folder, f), "utf8")
          const heading = text.match(/^#\s+(.+)$/m)
          return {
            slug: f.replace(/\.md$/, ""),
            title: heading ? heading[1].trim() : prettify(f),
            value: fs.readFileSync(path.join(CONTENT_DIR, folder, f), { encoding: "utf-8", flag: "r" }),
          } satisfies Lesson;
        });

      return { slug: folder, title: prettify(folder), lessons } satisfies Chapter;
    })
}
