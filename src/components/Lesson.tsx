import { marked } from 'marked';
import * as fs from "node:fs";
import {Cell, Grid, Gridline} from "react-resizable-panels";
import {Console} from "@/components/panels/Console";
import {CodeEditor} from "@/components/panels/Editor";
import {Wrapper} from "@/components/Wrapper";
import { getChapters } from '@/lib/chapters';

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
        <div className={className}>
            <Grid columns={2} rows={3}>
                <Cell row={0} column={0} rowSpan={3}>
                    <Markdown filename={currentLesson.filename} />
                </Cell>

                <Gridline className="w-1.5 z-1 bg-base-300 transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary"  type="column" column={1} />

                <Cell row={0} column={1} rowSpan={2}>
                    <Wrapper title="Code" button>
                        <CodeEditor content="testing" ></CodeEditor>
                    </Wrapper>
                </Cell>

                <Gridline className="h-1.5 bg-base-300 transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary"  type="row" row={2} column={1} />

                <Cell row={2} column={1}>
                    <Wrapper title="Output">
                        <Console output="x = 3" />
                    </Wrapper>
                </Cell>
            </Grid>
        </div>
    )
}

interface markdownProps {
    filename: string;
}

const Markdown = ({ filename }: markdownProps) => {
    const content = fs.readFileSync(filename, 'utf8')

    return (
        <div
            className="prose max-w-none p-10 h-full"
            dangerouslySetInnerHTML={{ __html: marked(content) as string }}
        />
    )
}
