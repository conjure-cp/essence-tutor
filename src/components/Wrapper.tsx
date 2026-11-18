"use client"

import {ReactNode} from "react";
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <div className="flex flex-col h-full w-full p-2">
            <div className="flex h-full w-full flex-col rounded-xl p-3 bg-secondary border-1">
                <div className="flex h-12 w-full shrink-0 flex-row items-center justify-between px-3 py-1">
                    {header ?? (
                        <h1 className="text-2xl font-bold">{title}</h1>
                    )}
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
                </ div>
                <div className="min-h-0 flex-1">{children}</div>
            </div>
        </div>
    );
}