'use client';

import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { markdown } from '@codemirror/lang-markdown';

// Import for ref
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';


const languageExtensions: { [key: string]: any } = {
    js: javascript({ jsx: true }),
    jsx: javascript({ jsx: true }),
    ts: javascript({ typescript: true }),
    tsx: javascript({ typescript: true, jsx: true }),
    html: html(),
    css: css(),
    md: markdown(),
    // Add more mappings for other languages
};

const getLanguageExtension = (filename: string) => {
    const extension = filename.split('.').pop();
    return languageExtensions[extension || ''] || javascript(); // Default to JavaScript if the language is not supported
};

const CodeEditor = ({
                        filename = "../../docs/content.md",
                        content,
                        onSave,
                        onContentChange,
                    }: {
    filename?: string,
    content: string,
    onSave: (filename: string, content: string) => void,
    onContentChange?: (content: string) => void,
}) => {
    let editorRef = useRef<ReactCodeMirrorRef>(null);

    const [value, setValue] = useState(content);

    useEffect(() => {
        // Check for editorRef.current.view before accessing it
        if (editorRef.current?.view) {
            const currentValue = editorRef.current.view.state.doc.toString();
            if (currentValue !== content) {
                console.log("Content Prop Change Detected, Updating Editor:", content);
                console.log("Current CodeMirror Doc State:", currentValue);

                setValue(content);
                editorRef.current.view.dispatch({
                    changes: { from: 0, to: currentValue.length, insert: content },
                });
            }
        }
    }, [content, editorRef]);

    const handleChange = useCallback((val: string) => {
        setValue(val);
        if (onContentChange) {
            onContentChange(val);
        }
    }, [onContentChange]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // Prevent default save behavior
            onSave(filename, value); // Call the save function with current content
        }
    }, [filename, value, onSave]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const languageExtension = useMemo(() => getLanguageExtension(filename), [filename]);

    return (
        <div>
            <CodeMirror
                ref={editorRef}
                value={value}
                height="600px"
                extensions={[languageExtension]}
                theme="dark"
                onChange={handleChange}
                style={{
                    lineHeight: '1.6',
                }}
                className='max-w-full text-sm md:text-lg'
            />
            <div className='flex flex-row gap-4 items-center mt-4'>
                <button onClick={() => onSave(filename, value)} className="btn">
                    Save
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;

