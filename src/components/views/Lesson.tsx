import { marked } from 'marked';
import * as fs from "node:fs";

export const Lesson = () => {
    const content = fs.readFileSync('public/docs/content.md', 'utf8')

    const getMarkdown = (content: string) => {
        if (content) {
            let markdown = marked(content , { sanitize: true })
            return { __html: markdown }
        }
    }

    return (
        <>
            {
                <div
                    className="prose max-w-none p-10 h-screen"
                    dangerouslySetInnerHTML={getMarkdown(content)}
                />
            }
        </>
    )
}