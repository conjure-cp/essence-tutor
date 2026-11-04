"use client"

import CodeMirror, {EditorView} from "@uiw/react-codemirror";
import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";

export const secondaryBg = EditorView.theme({
    "&": { backgroundColor: "var(--secondary)" },
    ".cm-gutters": {
        backgroundColor: "var(--secondary)",
        border: "none",
    },
});

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
            theme={"none"}
            extensions={[secondaryBg]}
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