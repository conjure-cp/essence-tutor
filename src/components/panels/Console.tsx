"use client"

import {prefersDarkTheme} from "@/components/common/dark";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

interface consoleProps {
    output: string;
}

export const Console = ({
    output
}: consoleProps) => {
    return (
        <CodeMirror
            value={output}
            height="100%"
            theme={prefersDarkTheme() ? "dark" : "light"}
            basicSetup={{
                foldGutter: false,
                highlightActiveLineGutter: false,
                dropCursor: false,
                highlightActiveLine: false
            }}
            editable={false}
            readOnly
            className='h-full max-w-full text-sm md:text-lg'
        />
    );
}