"use client"

import {ReactNode} from "react";
import {solve} from "@/components/common/solver";

interface wrapperProps {
    title: string
    children: ReactNode;
    button?: boolean;
}

export const Wrapper = ({
    title,
    children,
    button = false,
}: wrapperProps) => {
    return (
        <div className='flex flex-col h-full w-full'>
        {/*    Add the header bit */}
            <div className="flex flex-row w-full h-12 px-3 py-1 bg-neutral">
               <h1 className="font-bold text-2xl text-white flex-1">{title}</h1>
                {button && (
                    <button className="btn tn-soft p-2 b-0" onClick={solve}>run</button>
                )}
            </div>
            <div className="min-h-0 flex-1">{children}</div>
        </div>
    );
}