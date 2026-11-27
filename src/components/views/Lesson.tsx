"use client"

import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Chapter } from '@/lib/content';
import { cn } from "cn";
import { useSearchParams } from 'next/navigation';
import { RunnerPanel, ExamplesPanel } from '@/components/panels/Runner';
import { useTheme } from "next-themes";
import { Dispatch, isValidElement, ReactNode, SetStateAction, useState } from "react";
import { Task, TaskList, TaskState } from "@/components/TaskList";
import YAML from "yaml";

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

  // setup the editor state
  const [editorState, setEditorState] = useState('find x, y: bool such that x != y');

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className={cn(className, "w-full min-h-0 flex-1")}
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full w-full items-center justify-center p-2">
          <MarkdownPanel value={currentLesson.value} setEditorState={setEditorState} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <RunnerPanel editorState={editorState} setEditorState={setEditorState} initialConsoleContent="" />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

interface markdownProps {
  value: string;
  setEditorState: Dispatch<SetStateAction<string>>,
}

const MarkdownPanel = ({ value, setEditorState }: markdownProps) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  // Multi-line code blocks in markdown are converted to <pre><code class="language">...</code></pre>
  // Meanwhile, single-line code becomes <code></code>
  const getCode = (children: ReactNode): string => {
    if (isValidElement<{ children?: ReactNode }>(children)) {
      const inner = children.props.children;
      return typeof inner === "string" ? inner : Array.isArray(inner) ? inner.join("") : "";
    }
    return "";
  }

  return (
    <div className="bg-secondary rounded-lg border w-full h-full overflow-y-scroll">
      <div className="prose dark:prose-invert max-w-none p-10">
        <Markdown
          components={{
            pre(props) {
              const { node, children, ...rest } = props
              const code = getCode(children).replace(/\n$/, "");

              if (YAML.parse(code).tasks) {
                try {
                  let taskData: Task[] = YAML.parse(code).tasks;
                  return <TaskList tasks={taskData} />;
                } catch {
                  console.error(`error occurred while parsing YAML in markdown!`)
                  console.error(code);
                }
              } else {
                return <ExamplesPanel theme={theme} state={code} setState={setEditorState} />;
              }
            },
            code(props) {
              const { node, children, ...rest } = props
              return <strong className="font-mono">{children}</strong>
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {value}
        </Markdown>
      </div>
    </div>
  )
}
