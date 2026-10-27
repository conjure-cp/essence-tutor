import Image from "next/image";

export default function Home() {
  return (
    <main>
    <div className="mt-10 mx-auto w-[80%] border-4 border-white pt-6 pb-20">
      <h2 className="text-4xl font-semibold">What is Essence</h2>
        <p>Essence is a programming language that is super neat!</p>
    </div>

    <div className="mt-10 mx-auto w-[80%] border-4 border-white p-3">
      <h2 className="text-1xl font-semibold">Search bar</h2>
      <Image src="/search.png" alt="search bar icon" width={10} height={10}></Image>
    </div>

    <div className="mt-10 mx-auto w-[80%] border-4 border-white p-6">
      <h2 className="text-1xl font-semibold">Chapter 1</h2>
    </div>

    <div className="mt-10 mx-auto w-[80%] border-4 border-white p-6">
      <h2 className="text-1xl font-semibold">Chapter 2</h2>
    </div>

    <div className="mt-10 mx-auto w-[80%] border-4 border-white p-6">
      <h2 className="text-1xl font-semibold">Chapter 3</h2>
    </div>

    </main>
  );
}
