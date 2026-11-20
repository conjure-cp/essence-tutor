import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CopyIcon} from "lucide-react";
import {cn} from "cn";

interface copyButtonProps {
    className?: string;
    variant?: "outline";
    size?: "default";
    content: string | undefined;
    message?: string;
}

export function CopyButton({ className, variant = "outline", size = "default", message = "Copy Code", content }: copyButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger render={
                <Button
                    aria-label="copy"
                    className={cn(className, "pl-2")}
                    variant={variant}
                    size={size}
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