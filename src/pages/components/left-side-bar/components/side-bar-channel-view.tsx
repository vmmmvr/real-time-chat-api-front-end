import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RoomComponent } from "./room";

export  function SideBarChannelViewer({channels, title}: {channels: [], title: string}) {
    const params = useParams();
     const [selectedChannel, setselectedChannel] = useState(null)
   
   useEffect(() => {
      
     
     return () => {
       
     }
   }, [channels, params])
 
  
   
 
 
   
   return (
     <div>
 {
         channels.map((chnnl: any, index) => {
               const currenturluuid = params["*"]?.split("/")[1];
               // console.log({
               //   currenturluuid,
               //   room: chnnl.rooms
               // });
               
               const seletedChannel =  currenturluuid === chnnl.uuid ??  chnnl.rooms.find(room => room.uuid === currenturluuid)
           return (
             <div key={chnnl.uuid} className={`mb-1 ${seletedChannel ? "bg-primar"  : ""}  p-2 rounded-md`}>
         {/* room  */}
         <div
           className={`flex  w-full flex-row justify-between cursor-pointer ${seletedChannel ? "bg-primar" : ""} rounded-md`}
         >
             <Link to={`/channels/${chnnl.uuid}` } onClick={() => setselectedChannel({...chnnl})}>
               <div  className="flex flex-row items-center text-clip">
                 <img src="/avatar.svg" className="w-5 h-5 rounded-full mx-1" alt="" />
               <span className={`  ${seletedChannel ? "text-gray-600" : "text-gray-600"}  truncate ...`}>{chnnl.name}</span>
 
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
 