import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RoomComponent } from "./room";

export  function SideBarChannelViewer({channels, title}: {channels: [], title: string}) {
     const [selected, setselected] = useState({
      channeluuid: null,
      roomuuid: null
     })
   

     const param = useParams();
     const spiltted = param["*"]?.toString().split("/")
   
     console.log({selected});
   
   

   useEffect(() => {
      
     
     return () => {
       
     }
   }, [channels, param])
 
  
   const theme = {
    selected: "flex  w-full flex-row justify-between cursor-pointer rounded-md ",
    unselected: "flex  w-full flex-row justify-between cursor-pointer rounded-md"
   };
 
 
   
   return (
     <div>
 {
         channels.map((chnnl: any, index) => {
   
           return (
             <div key={chnnl.uuid} className={`mb-1 ${selected.channeluuid === chnnl.uuid ? "bg-primary-hover bg-opacity-80"  : ""}  p-2 rounded-md`}>
         {/* room  */}
         <div
           className={` ${selected.channeluuid === chnnl.uuid ? theme.selected: theme.unselected} `}
         >
             <Link to={`/channels/${chnnl.uuid}` } onClick={() => setselected({channeluuid: chnnl.uuid, roomuuid: chnnl.rooms[0].uuid})}>
               <div  className="flex flex-row items-center  text-clip">
                 <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
               <span className={`  ${selected.channeluuid === chnnl.uuid ? "text-gray-600" : "text-gray-600"}  truncate ...`}>{chnnl.name}</span>
 
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
             <Link to={`/rooms/${room.uuid}`} onClick={() => setselected({channeluuid: room.channeluuid, roomuuid: room.uuid})}>
                 <RoomComponent selected={ room.uuid === selected.roomuuid ? true : false} room={room} />
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
 