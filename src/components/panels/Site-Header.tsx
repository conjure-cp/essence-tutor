import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {GithubIcon} from "@/components/icons/logos-github-icon";
import {ModeToggle} from "@/components/ui/mode-toggle";

export function SiteHeader() {
    return (
        <header className="p-2 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2"
                />
                <h1 className="select-none text-base font-medium">Documents</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" aria-label="Visit our Github" >
                        <a
                            href="https://github.com/conjure-cp/essence-tutor"
                            rel="essence tutor github"
                            target="_blank"
                        >
                            Report an Issue
                        </a>
                    </Button>

                    <Tooltip>
                        <TooltipTrigger render={
                            <Button variant="ghost" size="icon-lg" aria-label="Visit our Github" >
                                <a
                                    href="https://github.com/conjure-cp/essence-tutor"
                                    rel="essence tutor github"
                                    target="_blank"
                                >
                                    <GithubIcon className="dark:invert" />
                                </a>
                            </Button>
                        } />
                        <TooltipContent>
                            <p>Github</p>
                        </TooltipContent>
                    </Tooltip>

                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
