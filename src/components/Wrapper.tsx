"use client"

import { Model } from "@/lib/model";
import { AASRunner } from "@/lib/runners/aas";
import { Runner } from "@/lib/runners/abstract";
import {ReactNode} from "react";

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

async function solve() {
    let model: Model = new Model("find x : int(1..3)", new Map<string, string>());
    Runner.setInstance(new AASRunner());
    Runner.getInstance()!.solve(model, "kissat");

    console.log(model);
}
