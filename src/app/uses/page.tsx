import Image from "next/image";
import Link from "next/link";
import { MerpEyes } from "@/components/ui/merp-eyes-following";

export default function Uses() {
    return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      {/* Here's the text box */}
      <div className="mx-auto w-[80%] rounded-xl bg-white pt-20 pb-70 px-8 text-center drop-shadow-xl">

        <div className="absolute -bottom-10 -right-10">
          <MerpEyes />
        </div>

        <h2 className="font-mono text-6xl font-semibold text-stone-600">Uses</h2>
        <p className="mt-8 text-m text-stone-500">Essence is a programming language commonly used in <strong>Conjure</strong> and <strong>Conjure Oxide.</strong></p>
        <p className="mt-8 text-m text-stone-500">Conjure and Conjure Oxide are two programs used for constraint-based programming.</p>
        <p className="mt-8 text-m text-stone-500">For further information, please examine the following links:</p>
        <a href="https://conjure.readthedocs.io/en/latest/welcome.html" target="_blank"> Visit Conjure Oxide's Documentation</a>
        <p> </p>
        <a href="https://conjure.readthedocs.io/en/latest/welcome.html" target="_blank"> Visit Conjure's Documentation</a>
        {/* Guess who forgot that you can use percentages to center/place stuff...... */}
        <Image src="/star.png" alt="" width={60} height={60} className="absolute -bottom-0 right-[10%]"/>
        <Image src="/star.png" alt="" width={20} height={20} className="absolute -bottom-0 right-[14%]"/>
      </div>
    </main>
    )
}