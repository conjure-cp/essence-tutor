"use client"

import { Model } from "@/lib/model";
import { AASRunner } from "@/lib/runners/aas";
import { Runner } from "@/lib/runners/abstract";
import {ReactNode} from "react";
import {Button} from "@/components/ui/button";
import {PlayIcon} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <div className="h-full w-full p-2">
            <div className="flex h-full w-full flex-col rounded-xl p-3 bg-secondary border-1">
                <div className="flex h-12 w-full shrink-0 flex-row px-3 py-1">
                    <h1 className="flex-1 text-2xl font-bold">{title}</h1>
                    {button && (
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button size="icon-lg" aria-label="Run" variant="outline" onClick={() => {}}>
                                    <PlayIcon />
                                </Button>
                            } />
                            <TooltipContent>
                                <p>Run Essence Code</p>
                            </TooltipContent>
                        </Tooltip>


                    )}
                </div>
                <div className="min-h-0 flex-1">{children}</div>
            </div>
        </div>
    );
}

async function solve() {
    let model: Model = new Model("find x : int(1..3)", new Map<string, string>());
    Runner.setInstance(new AASRunner());
    Runner.getInstance()!.solve(model, "kissat");

    console.log(model);
}
