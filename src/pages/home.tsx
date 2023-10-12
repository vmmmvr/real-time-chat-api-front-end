import Navbar from './components/navbar'
import LeftSidebar from './components/left-sidebar'
import RightSidebar from './components/right-sidebar'
import { Routes, Route } from 'react-router-dom'
import Channels from './content/channels'
import Rooms from './content/rooms'
import MainContent from './content/main-content'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPrivateChannelsThunk, loadPublicChannelsThunk } from '../redux/channel/channel.thunk'
import { AnyAction } from 'redux'

export default function Home()  {
  const dispatch = useDispatch();
  const {publicChannels} = useSelector((state: any) => state.channel);

  const {accessToken, refreshToken} = useSelector((state: any) => state.auth);

  useEffect(() => {
    Promise.resolve(dispatch(loadPublicChannelsThunk() as unknown as AnyAction)).then(() => 
    dispatch(loadPrivateChannelsThunk({accessToken, refreshToken}) as unknown as AnyAction)
    )
    
    
  
    return () => {
      
    }
  }, [])
  

  
  return (
    <div className='h-full'>
      <Navbar />
        <div className='px-5 py-5 flex w-full justify-between h-[92vh]'>
            <LeftSidebar />
                <div className='flex-1 bg-white mx-5 '>
                  <MainContent />
                </div>
            <RightSidebar />
        </div>

    </div>
  )
}
