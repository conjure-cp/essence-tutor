import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CopyIcon} from "lucide-react";

interface copyButtonProps {
    className?: string;
    content: string | undefined;
    message?: string;
}

export function CopyButton({ className, message = "Copy Code", content }: copyButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger render={
                <Button
                    aria-label="copy"
                    className={className}
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={() => {navigator.clipboard.writeText(content ?? "")}}
                >
                    <CopyIcon />
                </Button>
            } />
            <TooltipContent>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    )
}