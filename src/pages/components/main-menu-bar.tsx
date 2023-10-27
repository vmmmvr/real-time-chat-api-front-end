import { Logo } from './icons'
import { BiGridAlt, BiGroup, BiMessageDetail, BiPhone , BiUserCircle} from 'react-icons/bi'

export default function MainMenuBar({openComponentSetter}) {
    const menuBarItems  = [
        {
            id: 1,
            link: "/latest-messages",
            icon: <BiMessageDetail className='text-primary' /> ,
        },
        {
            id: 2,
            link: "/",
            icon: <BiPhone className='text-primary' />  ,
        },
        {
            id: 3,
            link: "/",
            icon: <BiGroup className='text-primary' />  ,
        },
        {
            id: 4,
            link: "/",
            icon: <BiGridAlt className='text-primary' />  ,
        },
    ]
  return (
    // <div className=''>
    <div className='sm:h-screen  sm:top-0 sm:left-0 sm:w-20 w-screen -bottom-3 h-16 flex flex-row justify-between items-center sm:justify-between sm:flex-col sm:relative absolute bg-white shadow-md'>
          <div className='cursor-pointer'><Logo size={24} classes='font-normal'  /></div>
            <div className=' m-0  grow sm:grow-0 flex flex-row justify-between  items-center  sm:mt-10 sm:flex-col sm:items-center'>
                {
                    menuBarItems.map(item => (
                          <div onClick={() => openComponentSetter(item.id)} key={item.id} className='my-5 cursor-pointer'> <div className='w-[5px] h-[5px] bg-indigo-500 rounded-full relative  top-2 left-8'>
                        </div> <div className='p-3 bg-secondary rounded-md '> {item.icon}  
                        </div></div>
                   ))
                }
              </div>

            <div className='mx-5 sm: my-5'>
                    <div onClick={() => openComponentSetter(5)} className='cursor-pointer'>    <BiUserCircle size={24} className='text-primary' /> </div>
            </div>
    </div>  

    // </div>
  )
}
