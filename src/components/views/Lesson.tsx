import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as fs from "node:fs";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {Console} from "@/components/panels/Console";
import {CodeEditor} from "@/components/panels/Editor";
import {Wrapper} from "@/components/Wrapper";
import { getChapters } from '@/lib/chapters';
import {cn} from "cn";
import { RunnerPanel } from '../panels/Runner';
import { Task, TaskAccordion, TaskState } from '../TaskComponent';

export type LessonParams = Promise<{ chapter?: string; lesson?: string }>

interface lessonPanelProps {
    className?: string
    searchParams: LessonParams
}

export const LessonPanel = async ({ className, searchParams }: lessonPanelProps) => {
    const { chapter, lesson } = await searchParams
    const chapters = getChapters()

    const currentChapter =
        chapters.find((c) => c.urlFriendly === chapter) ?? chapters[0]
    const currentLesson =
        currentChapter?.lessons.find((l) => l.urlFriendly === lesson) ??
        currentChapter?.lessons[0]

    if (!currentLesson) return <p className="p-10">No lessons found.</p>
    
    return (
            <ResizablePanelGroup
                orientation="horizontal"
                className={cn(className, "w-full min-h-0 flex-1")}
            >
                <ResizablePanel defaultSize="50%">
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <Markdown filename={currentLesson.filename} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <RunnerPanel initialEditorContent="testing" initialConsoleContent="x = 0" />
                </ResizablePanel>
            </ResizablePanelGroup>
    )
}

interface markdownProps {
    filename: string;
}

const Markdown = ({ filename }: markdownProps) => {
    const content = fs.readFileSync(filename, 'utf8')

    return (
        <div className="bg-secondary rounded-lg border w-full h-full overflow-y-scroll">
            <div className="prose dark:prose-invert max-w-none p-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
                <TaskAccordion tasks={[
                    { title: "Hello world!", description: "This is a sample task.", state: 0 },
                    { title: "Another task!", description: "This time it's complete.", boilerplate: "And has some boilerplate.", state: 2 },
                    { title: "Yet another task!", description: "Some description", state: 1 }
                ]} />
        </div>
    )
}
