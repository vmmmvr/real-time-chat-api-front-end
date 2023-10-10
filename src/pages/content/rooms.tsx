import { useSelector } from "react-redux";
import { SendIcon } from "../../icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Room } from "../../types";
import { useForm } from "react-hook-form";
export default function Rooms() {
  const {uuid} = useParams();
  const {publicChannels} = useSelector((state: any) => state.channel);
  const [selectedRoom, setselectedRoom] = useState<Room | null>(null)
  const { register, formState: { errors }, handleSubmit } = useForm();

  useEffect(() => {
      const room = publicChannels.find(channel => channel.rooms.find(room => room.uuid === uuid)).rooms.find(room => room.uuid === uuid);
   
        setselectedRoom({...room})
    
    return () => {
      
    }
  }, [publicChannels])
  
  return (
    <div className="flex  flex-col text-center justify-between h-full  ">
      <div className="border-b border-gray-100 py-2 flex-2">
        <h1 className="text-gray-600  font-bold">{selectedRoom?.name}</h1>
        <small className="text-gray-400">last message {selectedRoom?.messages.length} mins ago</small>
      </div>

      <div className="messages my-5 px-3 flex-1 flex flex-col justify-end ">
        <div className="flex flex-row text-start items-start border-b pb-3 border-slate-50">
        <img className="w-7 rounded-full" src="/avatar.svg" alt="pfp"/>
        <div className="mx-2 flex  flex-col items-start text-gray-500">
          <div className="mb-2">  <span className="font-bold text-sm">Ammar mohammed</span> <small className="font-thin">12:34 AM</small></div>
            <span className="text-sm bg-slate-50 p-2 rounded-md">
              Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:
              Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:
              Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:
              Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:
              Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:  
              </span>
        </div>
        </div>
      </div>

      <div className="px-3 flex-2">
      <form  onSubmit={handleSubmit((data) => {})}>
      

            <textarea {...register("message", {required: true})} className=" w-full text-sm text-gray-600 outline-none border border-gray-300 px-3 py-2 rounded-md" name="" placeholder="send message" id="" ></textarea>
            <small className="text-red-500">  {errors.name?.type === 'required' && "channel Name is required"} </small>
            
            <button  type="submit" className="bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md flex flex-row"><span>Send</span> <SendIcon  /></button>
        
            {/* <button className="bg-primary px-5 py-2 text-white text-sm rounded-md">Create A Channel</button> */}
          </form>
          <div>
        
            </div> 
      </div>
    </div>
  );
}
