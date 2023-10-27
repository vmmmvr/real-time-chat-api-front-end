import RightSidebar from '../components/right-sidebar'
import MainContent from './main-content'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AnyAction } from 'redux'
import MainMenuBar from '../components/main-menu-bar'
import { LeftSideBar } from '../components/left-side-bar'
import {  loadPrivateChannelsThunk , loadPublicChannelsThunk} from '@/redux'

export default function Home()  {
  const dispatch = useDispatch();
  const [openComponent, setopenComponent] = useState(1)

  const {accessToken, refreshToken} = useSelector((state: any) => state.auth);

  useEffect(() => {
    Promise.all([dispatch(loadPrivateChannelsThunk({accessToken, refreshToken}) as unknown as AnyAction) ,dispatch(loadPublicChannelsThunk() as unknown as AnyAction)])
    
    
  
    return () => {
      
    }
  }, [])
  

  
  return (
    <div className='h-full flex flex-row w-full justify-end'>
        <MainMenuBar openComponentSetter={setopenComponent} />

      <div className='w-full'>
      {/* <Navbar /> */}
        <div className='px-5 py-5 flex w-full justify-between h-[92vh] sm:h-screen '>
        <LeftSideBar openedComponentId={openComponent} />
            
                <div className='flex-1 bg-white mx-5 '>
                  <MainContent />
                </div>
            <RightSidebar />
        </div>
      </div>

    </div>
  )
}
