// base reference: https://www.shadcndeck.com/blog/shadcn-header 
import Image from "next/image";
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"


export function SiteHeader() {
  return (
    <header className="w-full border-b border-stone-200 bg-stone-50">
      <div className="flex h-16 items-center justify-between px-6">
        { /* links back to the home page. cool. */}
        <Link href="/" className="flex items-center gap-2.5"> 
          { /* essence icon/site icon / merp! */}
        <Image src="/merp.png" alt="Merp essence logo" width={30} height={30} />
          <span className="h-4 w-[3px] rounded-full bg-purple-700" />
          <span className="font-serif text-xl bold text-stone-600 hover:text-stone-1000">
            Home
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/about" />} className="text-l font-medium text-stone-600 hover:text-stone-900">
                    About Essence
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/uses" />} className="text-l font-medium text-stone-600 hover:text-stone-900">
                    Uses
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/help" />} className="text-l font-medium text-stone-600 hover:text-stone-900">
                    Help
                </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <a
        href="https://forms.cloud.microsoft/e/a6tWZY607U"
        target="_blank"
        className="inline-flex h-8 items-center rounded-full bg-purple-800 px-4 text-sm text-white hover:bg-purple-950"
        >
            Report a Bug
        </a>
      </div>
    </header>
  )
}