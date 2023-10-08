import React from 'react'
import Navbar from './components/navbar'
import LeftSidebar from './components/left-sidebar'

export default function Home()  {
  return (
    <div>
      <Navbar />
        <div className='px-5 py-5'>
            <LeftSidebar />
        </div>

    </div>
  )
}
