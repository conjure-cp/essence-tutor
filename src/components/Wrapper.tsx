"use client"

import {ReactNode} from "react";

interface wrapperProps {
    title: string
    header?: ReactNode;
    children: ReactNode;
    button?: boolean;
}

export const Wrapper = ({
    title,
    header,
    children,
    button = false,
}: wrapperProps) => {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-row items-center w-full h-12 px-3 py-1 bg-neutral">
                <div className="flex-1 min-w-0">
                    {header ?? (
                        <h1 className="font-bold text-2xl text-white">{title}</h1>
                    )}
                </div>
                {button && (
                    <button className="btn tn-soft p-2 b-0" onClick={() => {}}>run</button>
                )}
            </div>
            <div className="min-h-0 flex-1">{children}</div>
        </div>
    );
}
