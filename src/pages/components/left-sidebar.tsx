import {  useState } from "react";
import { AddIcon, ArrowDown, ArrowRight } from "../../icons";
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import DialogComponent from "./dialog";
import AddChannel from "./add-channel";
import { useSelector } from "react-redux";

export default function LeftSidebar() {
  const [show, setshow] = useState(false);
  const [showModal, setshowModal] = useState(false);

 function dialogCloser() { setshowModal(!showModal) }
 const {publicChannels} = useSelector((state: any) => state.channel);


 
  return (
    <div className="flex-2 lg:w-1/5 w-1/6 bg-white rounded-md p-3 h-56 hidden sm:block">
<DialogComponent toggleFunc={dialogCloser} toggle={showModal} child={<AddChannel dialogCloser={dialogCloser} />} />
      
    <div>
       <div className="flex flex-row justify-between">
       <h4 className="text-gray-500">Public Channels</h4> <button onClick={() => setshowModal(!showModal)}> <AddIcon  /></button>
      </div>
    
      <div className="pt-5">
      {
        publicChannels.map((channel, index) => (   <div key={channel.uuid} className="bg-white rounded-md p-2">
        {/* room  */}
        <div
          className="flex flex-row justify-between cursor-pointer hover:bg-secondary p-2 rounded-md"
          onClick={() => setshow(!show)}
        >
            <Link to='/channels' >
                    <h5 className="text-primary">{channel.name}</h5>
            </Link>
        
        <div className="flex flex-row">
        <span className="text-xs bg-primary text-white py-1 px-2 rounded-full">
            {
              channel.rooms.length
            }
          </span>
        {show ? <ArrowRight />   :<ArrowDown />} 
        </div>
        </div>
        {
          <div
            className={
              `flex flex-col p-2 transition ease-in-out px-5 ` +
              (show && `hidden`)
            }
          >
          {
            channel.rooms.map(room => (  <div key={room.uuid} className="py-2 my-1 flex flex-row items-center justify-between  hover:bg-secondary cursor-pointer rounded-md px-2">
            <Link to={`/rooms/${room.uuid}`} >
            <span className="text-xs text-gray-500"> {room.name} </span>
            </Link>
              <div className="flex flex-row">
              <span className="text-xs bg-primary text-white py-1 px-2 rounded-full">
                {
                  room.messages.length
                }
              </span>
              <ArrowRight  />
                </div>
            
            </div>))
          }

          </div>
        }
      </div>))
      }
      </div>
    </div>
  </div>
  );
}
