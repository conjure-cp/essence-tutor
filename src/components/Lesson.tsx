import { marked } from 'marked';
import * as fs from "node:fs";
import {Cell, Grid, Gridline} from "react-resizable-panels";
import {Console} from "@/components/panels/Console";
import {CodeEditor} from "@/components/panels/Editor";
import {Wrapper} from "@/components/Wrapper";
import {solve} from "@/lib/solver";

interface lessonPanelProps {
    className?: string;
}

export const LessonPanel = ({
                                className
}: lessonPanelProps) => {
    return (
        <div className={className}>
            <Grid columns={2} rows={3}>
                <Cell row={0} column={0} rowSpan={3}>
                    <Markdown filename="public/docs/content.md" />
                </Cell>

                <Gridline className="w-1.5 z-1 bg-base-300 transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary"  type="column" column={1} />

                <Cell row={0} column={1} rowSpan={2}>
                    <Wrapper title="Code" button>
                        <CodeEditor content="testing" ></CodeEditor>
                    </Wrapper>
                </Cell>

                <Gridline className="h-1.5 bg-base-300 transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary"  type="row" row={2} column={1} />

                <Cell row={2} column={1}>
                    {/*<Console output="x = 3" />*/}
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

const Markdown = ({
    filename
}: markdownProps) => {
    const content = fs.readFileSync(filename, 'utf8')

    const getMarkdown = (content: string) => {
        if (content) {
            const markdown = marked(content)
            return { __html: markdown }
        }
    }

    return (
        <div
            className="prose max-w-none p-10 h-full"
            dangerouslySetInnerHTML={getMarkdown(content)}
        />
    )
}
