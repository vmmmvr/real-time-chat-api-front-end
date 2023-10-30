import { BiSolidLockAlt } from "react-icons/bi";
import { Room } from "src/types";

export  function RoomComponent({selected, room}: {selected: boolean, room: Room}) {
    let msgs = room.messages;
    const createdAt = msgs.length > 0 && msgs[msgs.length - 1]['createdAt'];
    const diff = createdAt ? new Date().getDate() - new Date(createdAt).getDate() : 0;
    
      
    return (
      <div className={`${selected ? "bg-primary  shadow-primary" : "bg-white hover:bg-primary-hover hover:text-white"} flex flex-row justify-between items-center 
      h-20 w-full px-4 py-2 cursor-pointer    rounded-lg  shadow-sm`}>
      <div className="flex flex-row w-full">
        <img src="/vite.svg" alt=""  className="rounded-full border-gray-500 border  w-10 h-10"/>
          <div className="flex flex-col ml-3">
                <div className="flex flex-row text-inherit text-sm font-semibold items-center">
                  <p>#</p>
                  <p className="text-inherit">{room.name}</p>
                    {room.private ?  <BiSolidLockAlt /> : <></>}
                </div>
                {
                  room.messages.length > 0 ? ( <div className="flex flex-row truncate ...">
                  <p className="font-bold text-xs  text-gray-700 ">{room?.messages?.[room?.messages.length -1  ]['sender']['name']}</p>
                  <p className="text-xs   text-gray-700 ">: {room?.messages?.[room?.messages.length -1  ]['message']?.slice(0, 10)}</p>
                </div>) : <></>
                }
               
          </div>
      </div>
        <div className="whitespace-nowrap flex flex-col items-end">
          <p className="text-xs font-semibold text-gray-400 ">{ diff} days ago</p>
          <div className="bg-primary text-[10px]  text-white mt-2 text-center rounded-full w-6 h-6 flex justify-center items-center "> <p>{room.messages.length}</p> </div>
        </div>
    </div>
    )
  }