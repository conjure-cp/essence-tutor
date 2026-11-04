"use client"

import CodeMirror from "@uiw/react-codemirror";
import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";

interface consoleProps {
    output: string;
}

export const Console = ({
    output
}: consoleProps) => {

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";

    return (
        <CodeMirror
            value={output}
            height="100%"
            theme={theme}
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