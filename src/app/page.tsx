'use client'
import ParticlesBg from "particles-bg";
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col justify-center text-center min-h-screen py-12 sm:px-6 lg:px-8">
      <ParticlesBg type="circle" bg={true} />
      <h1 className="text-5xl font-bold">律师AI助手</h1>
      <div className="flex justify-center items-center mt-10">
        <div className="border-solid border-2 border-sky-500 w-32 rounded-full flex items-center justify-center">
          <Link href='/user/dashboard' className="block p-4">开始</Link>
        </div>
      </div>

    </main>
  );
}
