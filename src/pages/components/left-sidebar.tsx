import {  useEffect, useState } from "react";
import { AddIcon, ArrowDown, ArrowRight, SearchIcon } from "./icons";
import { Link, useParams } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import DialogComponent from "./dialog";
import AddChannel from "../Channel/add-channel";
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
    <div className="flex-2 lg:w-1/5 w-1/6  bg-white shadow-md rounded-lg px-5   hidden sm:block">
<DialogComponent toggleFunc={dialogCloser} toggle={showModal} child={<AddChannel dialogCloser={dialogCloser} />} />
      
    <div className="w-full h-full flex flex-col">
      <div className="border-b-2 flex-2  py-5 border-slate-300 border-opacity-20 ">
          <div className=" flex border py-1 border-slate-200 rounded-md  flex-row max-w-full justify-between">
          <input className="focus:outline-0  max-w-[80%] rounded-md py-1 px-3" type="text" placeholder="search channels" />
          <button><SearchIcon classes="w-5 h-5 text-gray-400 ml-2 mx-2" /></button>
          </div>
      </div>
     
    
      <div className="flex flex-col overflow-auto justify-between flex-1 pb-5">
              
          <div className="">
            
          <SideBarChannelViewer channels={publicChannels} title={"Public Channels"}  />

          <SideBarChannelViewer channels={privateChannels} title={"Private Channels"}  />

          </div>
    
      </div>
      <button className="  bg-primary py-3 w-full relative bottom-1 my-5 text-sm   flex justify-center rounded-lg items-center  text-center  border" 
            onClick={() => setshowModal(!showModal)}
            > <AddIcon color="text-white" /><span className="text-white">Add A Channel</span></button>

    </div>
  </div>
  );
}



export  function SideBarChannelViewer({channels, title}: {channels: [], title: string}) {
  const [openMenuItems, setOpenMenuItems] = useState<OpenMenuProps[]>([])
   const params = useParams();

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
  }, [channels, params])

  console.log({
    params: params["*"]?.split("/")[1]
  });
  
  return (
    <div>
             <div className="flex flex-row justify-between py-5">
       <h4 className="text-gray-400"> {title} </h4> 
   
      </div>
{
        channels.map((chnnl, index) => (   <div key={chnnl.uuid} className="bg-white rounded-md px-2">
        {/* room  */}
        <div
          className={`flex flex-row justify-between cursor-pointer ${params["*"]?.split("/")[1] === chnnl.uuid ? "bg-primary" : ""} mt-2 mb-1  p-2 rounded-md`}
        >
            <Link to={`/channels/${chnnl.uuid}` }>
              <div className="flex flex-row items-center text-clip">
                <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
              <span className={`  ${params["*"]?.split("/")[1] === chnnl.uuid ? "text-white" : "text-gray-600"}  truncate ...`}>{chnnl.name}</span>

              </div>
            </Link>
        
        <div 
          onClick={() => showMenuItem(chnnl.uuid)
          }
        className="flex flex-row items-center pr-2">
        {/* <small className="text-xs text-[12px] font-semibold text-gray-300 p-1 rounded-full">
            {
              chnnl.rooms.length
            }
          </small> */}
        {openMenuItems?.find(item => item.itemuuid === chnnl.uuid)?.isOpen === true ? <ArrowRight />   :<ArrowDown />} 
        </div>
        </div>
        {
          <div
            className={
              `flex flex-col  transition ease-in-out px-5 ` +
              (openMenuItems?.find(item => item.itemuuid === chnnl.uuid)?.isOpen === false && `hidden`)
            }
          >
          {
            chnnl.rooms.map(room => (  <div key={room.uuid} className={`py-1 
             cursor-pointer rounded-md px-2   ${params["*"]?.split("/")[1] === room.uuid ? " bg-primary" : "hover:bg-secondary"} `}>
            <Link to={`/rooms/${room.uuid}`} >
            
              <div className="flex flex-row  justify-between items-center w-full">
                <span className={`text-sm px-1 py-2 rounded-lg  ${params["*"]?.split("/")[1] === room.uuid ? "text-white" : "text-gray-500"}   `}> {room.name} </span>

                <small className="text-xs text-[12px] font-semibold text-primary">
                  {
                    room.messages.length
                  }
                </small>
                    {/* <ArrowRight  /> */}
                </div>
                </Link>
            </div>))
          }

          </div>
        }
      </div>))
      }

    </div>
  )
}
