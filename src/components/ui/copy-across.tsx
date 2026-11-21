import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {SquareArrowRightExit} from "lucide-react";
import {cn} from "cn";

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
                    onClick={() => {console.log("Clicked")}}
                >
                    <SquareArrowRightExit />
                </Button>
            } />
            <TooltipContent>
                <p>Copy this to the Editor</p>
            </TooltipContent>
        </Tooltip>
    )
}