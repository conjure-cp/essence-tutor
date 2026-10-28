'use client';

import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';

import {prefersDarkTheme} from "@/components/common/dark";

interface codeEditorProps {
    filename?: string, // keeping because we may later use this
    content: string,
    onContentChange?: (content: string) => void
}

export const CodeEditor = ({
                        content,
                        onContentChange
}: codeEditorProps) => {
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

    return (
            <CodeMirror
                ref={editorRef}
                value={value}
                height="100%"
                theme={prefersDarkTheme() ? "dark" : "light"}
                onChange={handleChange}
                style={{
                    lineHeight: '1.6',
                }}
                className='h-full max-w-full text-sm md:text-lg'
            />
    );
};

