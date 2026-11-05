import { Suspense } from "react"
import { LessonPanel } from "@/components/Lesson"
import { getChapters } from "@/lib/chapters"

type Params = Promise<{ chapter?: string; lesson?: string }>

// Suspense handles the asynchronous loading of the Lesson component. It's a fallback while the data is being fetched.
export default function Home({ searchParams }: { searchParams: Params }) {
  return (
    <Suspense fallback={<div className="h-screen p-10">Loading...</div>}>
      <Lesson searchParams={searchParams} />
    </Suspense>
  )
}

async function Lesson({ searchParams }: { searchParams: Params }) {
  const { chapter, lesson } = await searchParams
  const chapters = getChapters()

  const currentChapter =
    chapters.find((c) => c.urlFriendly === chapter) ?? chapters[0]
  const currentLesson =
    currentChapter?.lessons.find((l) => l.urlFriendly === lesson) ??
    currentChapter?.lessons[0]

  if (!currentLesson) return <p className="p-10">No lessons found.</p>

  return <LessonPanel className="h-screen" filename={currentLesson.filename} />
}
