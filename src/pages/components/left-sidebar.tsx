import {  useEffect, useState } from "react";
import { AddIcon, ArrowDown, ArrowRight, SearchIcon } from "./icons";
import { Link, useParams } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import DialogComponent from "./dialog";
import AddChannel from "../Channel/add-channel";
import { useSelector } from "react-redux";
import { OpenMenuProps, Room } from "../../types";
import { BiGroup, BiSolidLockAlt } from "react-icons/bi";

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
    <div className="flex-2 lg:w-[330px] w-1/6      hidden sm:block">
<DialogComponent toggleFunc={dialogCloser} toggle={showModal} child={<AddChannel dialogCloser={dialogCloser} />} />
      
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
          <p  className="font-semibold text-primary text-sm">Channels</p>
            <div className=" bg-primary cursor-pointer hover:bg-primary-hover flex justify-between items-center px-2 rounded-md py-1 text-sm text-white text-center">  <p className="mx-1">New</p> <BiGroup  />  </div>
      </div>

      <div className=" flex-2  py-5  ">
          <div className=" flex border py-1 border-slate-200 rounded-md  flex-row max-w-full justify-between">
          <input className="focus:outline-0 flex-1 bg-slate-50  max-w-[80%] rounded-md text-sm py-1 px-3" type="text" placeholder="search channels" />
          <button><SearchIcon classes="w-5 flex-2 h-5 text-gray-400 ml-2 mx-2" /></button>
          </div>
      </div>
        <p className="text-primary font-semibold text-sm">Recent Chats</p>

        

      <div className="flex flex-col overflow-y-scroll justify-between flex-1 pb-3 pr-3">
              
          <div className="">
            
          <SideBarChannelViewer channels={publicChannels} title={"Public Channels"}  />

          <SideBarChannelViewer channels={privateChannels} title={"Private Channels"}  />

          </div>
    
      </div>


    </div>
  </div>
  );
}



export  function SideBarChannelViewer({channels, title}: {channels: [], title: string}) {
   const params = useParams();

   
  useEffect(() => {
     
    
    return () => {
      
    }
  }, [channels, params])


  
  return (
    <div>
             <div className="flex flex-row justify-between py-5">
       <h4 className="text-gray-400"> {title} </h4> 
   
      </div>
{
        channels.map((chnnl: any, index) => {
              const currenturluuid = params["*"]?.split("/")[1];
              console.log({
                currenturluuid,
                room: chnnl.rooms
              });
              
              const seletedChannel =  currenturluuid === chnnl.uuid ??  chnnl.rooms.find(room => room.uuid === currenturluuid)
          return (
            <div key={chnnl.uuid} className={`my-3 ${seletedChannel ? "bg-primary"  : ""}  p-2 rounded-md`}>
        {/* room  */}
        <div
          className={`flex  w-full flex-row justify-between cursor-pointer ${seletedChannel ? "bg-primary" : ""} rounded-md`}
        >
            <Link to={`/channels/${chnnl.uuid}` }>
              <div className="flex flex-row items-center text-clip">
                <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
              <span className={`  ${seletedChannel ? "text-white" : "text-gray-600"}  truncate ...`}>{chnnl.name}</span>

              </div>
            </Link>
        
        <div 
     
        className="flex flex-row items-center pr-2">
     
        </div>
        </div>
        {
          <div
            className={
              `flex flex-col  transition ease-in-out ` 
            }
          >
          {
            chnnl.rooms.map(room => (  <div key={room.uuid} className={`py-1 
             cursor-pointer rounded-md  
               `}>
            <Link to={`/rooms/${room.uuid}`} >
                <RoomComponent selected={params["*"]?.split("/")[1] === room.uuid ? true : false} room={room} />
                </Link>
            </div>))
          }

          </div>
        }
      </div>
          )
        }
      )
      }

    </div>
  )
}


export  function RoomComponent({selected, room}: {selected: boolean, room: Room}) {
  let msgs = room.messages;
  const createdAt = msgs.length > 0 && msgs[msgs.length - 1]['createdAt'];
  const diff = createdAt ? new Date().getDate() - new Date(createdAt).getDate() : 0;
  
  return (
    <div className={`bg-white flex flex-row justify-between items-center 
    h-20 w-full px-4 py-2 cursor-pointer  hover:bg-primary-hover hover:text-white rounded-lg ${selected ? "bg-primary-hover text-white": "text-primary"}`}>
    <div className="flex flex-row w-full">
      <img src="/vite.svg" alt=""  className="rounded-full border-gray-500 border  w-10 h-10"/>
        <div className="flex flex-col ml-3">
              <div className="flex flex-row text-inherit text-sm font-semibold items-center">
                <p>#</p>
                <p className="text-inherit">{room.name}</p>
                  {room.private ?  <BiSolidLockAlt /> : <></>}
              </div>
              <div className="flex flex-row truncate ...">
                <p className="font-bold text-xs  text-gray-700 ">Ammar</p>
                <p className="text-xs   text-gray-700 ">: hi devs</p>
              </div>
        </div>
    </div>
      <div className="whitespace-nowrap flex flex-col items-end">
        <p className="text-xs font-semibold text-gray-400 ">{ diff} days ago</p>
        <div className="bg-primary text-[10px]  text-white mt-2 text-center rounded-full w-6 h-6 flex justify-center items-center "> <p>11</p> </div>
      </div>
  </div>
  )
}

