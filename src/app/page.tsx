import {LessonPanel} from "@/components/views/Lesson"
import {getChapters} from "@/lib/content";
import { Suspense } from "react";

export default async function Home() {
  const chapters = await getChapters();
  
  return (
    <Suspense fallback="loading...">
      <LessonPanel chapters={chapters} />
    </Suspense>
  )
}

