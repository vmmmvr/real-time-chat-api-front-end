import React from 'react'
import { Logo } from './icons'
import { BiGridAlt, BiGroup, BiMessageDetail, BiPhone , BiUserCircle} from 'react-icons/bi'

export default function MainMenuBar() {
    const menuBarItems  = [
        {
            id: 1,
            icon: <BiMessageDetail className='text-primary' /> ,
        },
        {
            id: 2,
            icon: <BiPhone className='text-primary' />  ,
        },
        {
            id: 3,
            icon: <BiGroup className='text-primary' />  ,
        },
        {
            id: 4,
            icon: <BiGridAlt className='text-primary' />  ,
        },
    ]
  return (
    // <div className=''>
    <div className='sm:h-screen  sm:top-0 sm:left-0 sm:w-20 w-screen -bottom-3 h-16 flex flex-row justify-between items-center sm:justify-between sm:flex-col sm:relative absolute bg-white shadow-md'>
          <Logo size={24} classes='font-normal' />
            <div className=' m-0  grow sm:grow-0 flex flex-row justify-between  items-center  sm:mt-10 sm:flex-col sm:items-center'>
                {
                    menuBarItems.map(item => (<div key={item.id} className='my-5'> <div className='w-[5px] h-[5px] bg-indigo-500 rounded-full relative  top-2 left-8'></div> <div className='p-3 bg-secondary rounded-md '> {item.icon}  </div></div> ))
                }
              </div>

            <div className='mx-5 sm: my-5'>
                <BiUserCircle size={24} className='text-primary' />
            </div>
    </div>  

    // </div>
  )
}
