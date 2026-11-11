import ReactMarkdown from 'react-markdown'
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
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    )
}
