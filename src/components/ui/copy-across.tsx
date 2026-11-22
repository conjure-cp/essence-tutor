import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {ArrowRight} from "lucide-react";

interface props {
    className?: string;
}

export function CopyAcrossButton({ className }: props) {
    return (
        <Tooltip>
            <TooltipTrigger render={
                <Button
                    aria-label="Copy this to the Editor"
                    className={className}
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={() => {console.log("Clicked")}} // TODO: add the copying functionality
                >
                    <ArrowRight />
                </Button>
            } />
            <TooltipContent>
                <p>Copy this to the Editor</p>
            </TooltipContent>
        </Tooltip>
    )
}