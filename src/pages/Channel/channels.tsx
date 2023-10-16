import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { getAchannelThunk } from "../../redux/channel/channel.thunk";
import Loading from "../components/loading";
import { AddIcon } from "../components/icons";
import DialogComponent from "../components/dialog";
import AddChannel from "./add-channel";
import AddRoom from "../Room/add-room";

export default function Channels() {
  const dispatch = useDispatch();
  const {openedChannel, status}  = useSelector((state:any) => state.channel)
  const {accessToken, refreshToken, user}  = useSelector((state:any) => state.auth)
  // getAchannelThunk
  const {uuid} = useParams();

 
  
  useEffect(() => {
    console.log({
      openedChannel
    });
      dispatch(getAchannelThunk({channeluuid: uuid ?? "", accessToken, refreshToken}) as unknown as AnyAction)
    return () => {
      
    }
  }, [uuid])

  const [showModal, setshowModal] = useState(false);

  function dialogCloser() { setshowModal(!showModal) }
  
  return (
    <div className="p-5 flex flex-col items-center text-center">
      {
        user.uuid === openedChannel.creatoruuid ? <> 
        <DialogComponent toggleFunc={dialogCloser} toggle={showModal} child={<AddRoom dialogCloser={dialogCloser} />} />


        </> :   <div></div>
      }

      {
        status === "loading" ? <div> <Loading /> </div> : ( <div className="border-b border-gray-100 w-full flex items-center flex-col py-3">
        <img src="/avatar.svg" className="w-28 h-1w-28 rounded-full" alt="" />
        <h3 className="text-gray-600 font-semibold text-lg py-2">{openedChannel.name}</h3>
        <h4 className="text-gray-500 ">Public Channels</h4>
        <div>
          {
             user.uuid === openedChannel.creatoruuid ? <div className="my-5"> 
     <button className="flex flex-row bg-primary text-white py-1 px-2 rounded-md" onClick={() => setshowModal(!showModal)}> 
     <AddIcon color={"text-white"}  /> <span> Add A Room</span></button>
     
             </div> : <div></div>
          }
        </div>
     <div className="w-1/2 flex flex-row justify-between">
     <span className="text-gray-400">   <strong>  {openedChannel.users &&  openedChannel?.users.length }  </strong> Subscribers </span>
        <span className="text-gray-400">   <strong>  { openedChannel.rooms && openedChannel?.rooms.length }  </strong>Rooms</span>
     </div>
      </div>)
      }
     
    </div>
  );
}
