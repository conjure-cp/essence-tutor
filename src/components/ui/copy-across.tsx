import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {ArrowRight} from "lucide-react";
import {Dispatch, SetStateAction} from "react";

interface props {
    className?: string;
    state: string;
    setState: Dispatch<SetStateAction<string>>;
}

const copyAcross = (state: string, setState: Dispatch<SetStateAction<string>>) => {
    setState(state ?? "");
}

export function CopyAcrossButton({ className, state, setState }: props) {
    return (
        <Tooltip>
            <TooltipTrigger render={
                <Button
                    aria-label="Move to the Editor"
                    className={className}
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={() => {copyAcross(state, setState)}} // TODO: add the copying functionality
                >
                    <ArrowRight />
                </Button>
            } />
            <TooltipContent>
                <p>Move to the Editor</p>
            </TooltipContent>
        </Tooltip>
    )
}