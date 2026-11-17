import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      {/* Here's the text box */}
      <div className="mx-auto w-[80%] rounded-xl bg-white pt-20 pb-70 px-8 text-center drop-shadow-xl">
        <h2 className="font-mono text-6xl font-semibold text-stone-600">About Essence</h2>
        <p className="mt-8 text-m text-stone-500">Essence is a programming language that is super neat!</p>
      </div>
    </main>
    )
}