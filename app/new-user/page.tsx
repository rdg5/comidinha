import Link from 'next/link'

export default async function Home() {
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The best journaling app</h1>
        <p className="text-2xl text-white/60">
          Some description of the random best journaling app
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 p-4 rounded-lg text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
