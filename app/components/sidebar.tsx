const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-2">comidinha</h1>
        <p>Welcome to comidinha. Show us your lunch today</p>
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-2 mb-1">
          Sign in with Email
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full">
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Sidebar
