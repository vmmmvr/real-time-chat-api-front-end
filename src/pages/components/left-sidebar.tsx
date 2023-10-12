import {  useEffect, useState } from "react";
import { AddIcon, ArrowDown, ArrowRight, SearchIcon } from "../../icons";
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import DialogComponent from "./dialog";
import AddChannel from "./add-channel";
import { useSelector } from "react-redux";
import { OpenMenuProps } from "../../types";

export default function LeftSidebar() {
  const [show, setshow] = useState(false);
  const [showModal, setshowModal] = useState(false);

 function dialogCloser() { setshowModal(!showModal) }
 const {publicChannels, privateChannels} = useSelector((state: any) => state.channel);

useEffect(() => {
  

  return () => {
    
  }
}, [publicChannels])

 
  return (
    <div className="flex-2 lg:w-1/5 w-1/6 bg-white shadow-md rounded-lg px-5  hidden sm:block">
<DialogComponent toggleFunc={dialogCloser} toggle={showModal} child={<AddChannel dialogCloser={dialogCloser} />} />
      
    <div className="w-full">
      <div className="border-b-2 py-5 border-slate-300 border-opacity-20">
      <div className=" flex border py-1 border-slate-200 rounded-md  flex-row max-w-full justify-between">
      <input className="focus:outline-0  max-w-[80%] rounded-md py-1 px-3" type="text" placeholder="search channels" />
      <button><SearchIcon classes="w-5 h-5 text-gray-400 ml-2 mx-2" /></button>
      </div>
      </div>
     
       <div className="flex flex-row justify-between py-5">
       <h4 className="text-gray-400">Public Channels</h4> 
       <button className="  bg-gray-200 w-6  h-6 text-sm   flex justify-center rounded-lg items-center hover:bg-gray-600  text-center  border" onClick={() => setshowModal(!showModal)}> <AddIcon color="text-white" /></button>
      </div>
    
      <div className="">
      {
        publicChannels.map((channel, index) => (   <div key={channel.uuid} className="bg-white rounded-md px-2">
        {/* room  */}
        <div
          className="flex flex-row justify-between cursor-pointer hover:bg-secondary p-2 rounded-md"
        >
            <Link to={`/channels/${channel.uuid}` }>
              <div className="flex flex-row items-center">
                <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
              <h5 className="text-gray-500 ">{channel.name}</h5>

              </div>
            </Link>
        
        <div 
          onClick={() => setshow(!show)}
        className="flex flex-row items-center">
        <small className="text-xs text-[12px] font-semibold text-primary p-1 rounded-full">
            {
              channel.rooms.length
            }
          </small>
        {show ? <ArrowRight />   :<ArrowDown />} 
        </div>
        </div>
        {
          <div
            className={
              `flex flex-col  transition ease-in-out px-5 ` +
              (show && `hidden`)
            }
          >
          {
            channel.rooms.map(room => (  <div key={room.uuid} className="py-0  flex flex-row items-center justify-between  hover:bg-secondary cursor-pointer rounded-md px-2">
            <Link to={`/rooms/${room.uuid}`} >
            <span className="text-xs text-gray-500 "> {room.name} </span>
            </Link>
              <div className="flex flex-row items-center">
              <small className="text-xs text-[12px] font-semibold text-primary">
                {
                  room.messages.length
                }
              </small>
              <ArrowRight  />
                </div>
            
            </div>))
          }

          </div>
        }
      </div>))
      }

      <div></div>
 <SideBarChannelViewer channels={privateChannels} title={"Private Channels"} />


      </div>
    </div>
  </div>
  );
}



export  function SideBarChannelViewer({channels, title}: {channels: [], title: string}) {
  const [openMenuItems, setOpenMenuItems] = useState<OpenMenuProps[]>([])
 
    function showMenuItem(uuid) {
      setOpenMenuItems((state) => {
          const item  = (state.find(item => item.itemuuid === uuid)) ;
          const filtered = state.filter(st => st.itemuuid !== uuid);
          return [...filtered, {...item, isOpen: !item?.isOpen}]
      }
    
        
       )
    }
  useEffect(() => {
      channels.map(({uuid}) => setOpenMenuItems((state) => {
        
        return (state.filter(opItm => opItm.itemuuid === uuid).length === 0 ? [...state,{itemuuid: uuid, isOpen: false}] : [...state]    )
      }
    
        
       ))
    
    return () => {
      
    }
  }, [channels])
  console.log({
    openMenuItems
  });
  return (
    <div>
             <div className="flex flex-row justify-between py-5">
       <h4 className="text-gray-400"> {title} </h4> 
       <button className="  bg-gray-200 w-6  h-6 text-sm   flex justify-center rounded-lg items-center hover:bg-gray-600  text-center  border" 
      //  onClick={() => setshowModal(!showModal)}
       > <AddIcon color="text-white" /></button>
      </div>
{
        channels.map((pvChannel, index) => (   <div key={pvChannel.uuid} className="bg-white rounded-md px-2">
        {/* room  */}
        <div
          className="flex flex-row justify-between cursor-pointer hover:bg-secondary p-2 rounded-md"
        >
            <Link to={`/channels/${pvChannel.uuid}` }>
              <div className="flex flex-row items-center">
                <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
              <h5 className="text-gray-600 font-semibold">{pvChannel.name}</h5>

              </div>
            </Link>
        
        <div 
          onClick={() => showMenuItem(pvChannel.uuid)
          }
        className="flex flex-row items-center">
        <small className="text-xs text-[12px] font-semibold text-primary p-1 rounded-full">
            {
              pvChannel.rooms.length
            }
          </small>
        {openMenuItems?.find(item => item.itemuuid === pvChannel.uuid) ? <ArrowRight />   :<ArrowDown />} 
        </div>
        </div>
        {
          <div
            className={
              `flex flex-col  transition ease-in-out px-5 ` +
              (openMenuItems?.find(item => item.itemuuid === pvChannel.uuid)?.isOpen === false && `hidden`)
            }
          >
          {
            pvChannel.rooms.map(room => (  <div key={room.uuid} className="py-0  flex flex-row items-center justify-between  hover:bg-secondary cursor-pointer rounded-md px-2">
            <Link to={`/rooms/${room.uuid}`} >
            <span className="text-xs text-gray-500 "> {room.name} </span>
            </Link>
              <div className="flex flex-row items-center">
              <small className="text-xs text-[12px] font-semibold text-primary">
                {
                  room.messages.length
                }
              </small>
              <ArrowRight  />
                </div>
            
            </div>))
          }

          </div>
        }
      </div>))
      }

    </div>
  )
}
