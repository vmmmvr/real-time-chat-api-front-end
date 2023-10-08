export default function Navbar() {

  return (
    <div className="flex flex-col sm:flex-row justify-between px-5 py-2 items-center border-b">
        <span className="text-gray-700 cursor-pointer">ChatIO</span>
        <div className="flex flex-row cursor-pointer">
          <img className="w-10 rounded-full" src="/avatar.svg" alt="pfp"/>

          <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-600">Ammar mohammed</span>
          <span className="text-primary font-normal text-sm">Online</span>
        </div>
        </div>
      
    </div>
  )
}

