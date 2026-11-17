import {LessonPanel, LessonParams} from "@/components/views/Lesson"

export default function Home({ searchParams }: { searchParams: LessonParams }) {
  return (
    <LessonPanel searchParams={searchParams} />
  )
}

