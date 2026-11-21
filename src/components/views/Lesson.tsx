"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Chapter } from '@/lib/content';
import {cn} from "cn";
import { useSearchParams } from 'next/navigation';
import { RunnerPanel, ExamplesPanel } from '@/components/panels/Runner';
import {useTheme} from "next-themes";
import {ReactNode, useState} from "react";

interface lessonPanelProps {
    className?: string,
    chapters: Chapter[]
}

export const LessonPanel = ({ className, chapters }: lessonPanelProps) => {
    const params = useSearchParams();

    const chapter = params.get("chapter");
    const lesson = params.get("lesson");

    const currentChapter =
        chapters.find((c) => c.slug === chapter) ?? chapters[0]
    const currentLesson =
        currentChapter?.lessons.find((l) => l.slug === lesson) ??
        currentChapter?.lessons[0]

    if (!currentLesson) return <p className="p-10">No lessons found.</p>

    return (
            <ResizablePanelGroup
                orientation="horizontal"
                className={cn(className, "w-full min-h-0 flex-1")}
            >
                <ResizablePanel defaultSize="50%">
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <Markdown value={currentLesson.value} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <RunnerPanel initialEditorContent='find x, y: bool such that x != y' initialConsoleContent="" />
                </ResizablePanel>
            </ResizablePanelGroup>
    )
}

interface markdownProps {
    value: string;
}

const Markdown = ({ value }: markdownProps) => {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    return (
        <div className="bg-secondary rounded-lg border w-full h-auto overflow-y-scroll">
            <div className="prose dark:prose-invert max-w-none p-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </div>
            <ExamplesPanel theme={theme} state={"hello there\nhow are you?"} />
        </div>
    )
}
