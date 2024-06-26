import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import UploadComponent from './upload'

interface SidebarProps {
  href: string
}

const Sidebar: React.FC<SidebarProps> = ({ href }) => {
  const { isSignedIn } = useAuth()

  return (
    <div className="w-1/5 h-screen bg-green-100 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold font-mono mb-2 text-black">
          comidinha
        </h1>
        <p className="text-black font-mono">
          Welcome to comidinha. Show us your lunch today
        </p>
      </div>
      <div>
        {isSignedIn ? (
          <UploadComponent />
        ) : (
          <Link href={href}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-2 mb-1">
              Vamos
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Sidebar
