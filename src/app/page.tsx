import { Suspense } from "react"
import { LessonPanel } from "@/components/Lesson"
import { getChapters } from "@/lib/chapters"

// Suspense handles the asynchronous loading of the Lesson component. It's a fallback while the data is being fetched.
export default function Home({ searchParams }: { searchParams: LessonParams }) {
  return (
    <Suspense fallback={<div className="h-screen p-10">Loading...</div>}>
      <LessonPanel className="h-screen" searchParams={searchParams} />
    </Suspense>
  )
}

