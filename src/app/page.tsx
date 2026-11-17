import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      {/* Ok, here's where the merp pic is. when you hover, she has magic!!!! */}
      <div className="group relative mb-8">
        <Image src="/merp.png" alt="Merp" width={200} height={200} />
        <Image src="/magicalMerp.png" alt="Magical merp" width={200} height={200} className="absolute top-0 left-0 opacity-0 group-hover:opacity-100"
        />
      </div>
      {/* Here's the title box! */}
      <div className="mx-auto w-[80%] rounded-xl bg-white pt-20 pb-20 px-8 text-center drop-shadow-xl">
        
        {/* Here's the cute stars */}
        
        <Image src="/star.png" alt="" width={100} height={100} className="absolute -top-5 -right-10" />
        <Image src="/star.png" alt="" width={50} height={50} className="absolute -top-10 -right-12" />

        <Image src="/star.png" alt="" width={100} height={100} className="absolute -bottom-8 -left-8" />
        <Image src="/star.png" alt="" width={50} height={50} className="absolute -bottom-13 -left-10" />

        <Image src="/star.png" alt="" width={20} height={20} className="absolute -top-5 -left-8" />
        <Image src="/star.png" alt="" width={20} height={20} className="absolute -top-9 -left-2" />
        <Image src="/star.png" alt="" width={60} height={60} className="absolute -top-5 -left-5" />

        <Image src="/star.png" alt="" width={20} height={20} className="absolute -bottom-5 -right-8" />
        <Image src="/star.png" alt="" width={20} height={20} className="absolute -bottom-9 -right-2" />
        <Image src="/star.png" alt="" width={60} height={60} className="absolute -bottom-5 -right-5" />

        <h2 className="font-mono text-6xl font-semibold text-stone-600">Welcome to Essence Tutor</h2>
          <div className="mt-8 mb-8 flex justify-center gap-4">
            <Link href="/start" className="font-mono rounded-full bg-purple-800 px-20 pt-5 pb-5 text-xl text-white hover:bg-purple-950">
            Start New 
            </Link>
            <Link href="/upload" className="font-mono rounded-full bg-purple-800 px-20 pt-5 pb-5 text-xl text-white hover:bg-purple-950">
            Upload Progress
            </Link>
          </div>
        <p className="mt-6 text-m text-stone-500"> First time here? Select "Start New" if you've never worked in Essence Tutor before, or "Upload Progress" if you've already explored it!</p>
      </div>
    </main>
  );
}
