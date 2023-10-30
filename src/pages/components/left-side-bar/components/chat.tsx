import { BiGroup } from "react-icons/bi";
import { SearchIcon } from "../../icons";
import { SideBarChannelViewer } from "./side-bar-channel-view";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function ChatSideBarComponent({ setShowAddChannelModal, publicChannels, privateChannels}) {
  


  return (
          
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
            <p  className="font-semibold text-primary text-sm">Channels</p>
              <div onClick={() => setShowAddChannelModal()} className=" bg-primary cursor-pointer hover:bg-primary-hover flex justify-between items-center px-2 rounded-md py-1 text-sm text-white text-center">
                  <p className="mx-1">New</p> <BiGroup  />  </div>
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
            <SideBarChannelViewer channels={privateChannels} title={"Private Channels"}  />
            <SideBarChannelViewer channels={publicChannels} title={"Public Channels"}  />
  
  
            </div>
      
        </div>
  
  
      </div>
    )
  }
  