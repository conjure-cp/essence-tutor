"use client"

import {ReactNode} from "react";
import {solve} from "@/lib/solver";
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
            <div className="flex h-full w-full flex-col rounded-xl bg-white p-3 dark:bg-secondary border-1">
                <div className="flex h-12 w-full shrink-0 flex-row px-3 py-1">
                    <h1 className="flex-1 text-2xl font-bold text-black dark:text-white">{title}</h1>
                    {button && (
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button size="icon-lg" aria-label="Run" variant="outline" onClick={solve}>
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
