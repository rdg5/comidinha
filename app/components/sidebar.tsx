import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Sidebar = ({ href }) => {
  const user = useUser()
  console.log(user)

  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-2">comidinha</h1>
        <p>Welcome to comidinha. Show us your lunch today</p>
      </div>
      <div>
        <Link href={href}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-2 mb-1">
            Vamos
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
