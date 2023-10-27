import {  useEffect, useState } from "react";
import DialogComponent from "../dialog";
import AddChannel from "../../Channel/components/add-channel";
import { useSelector } from "react-redux";
import * as React from "react";
import { ChatSideBarComponent, ProfileComponent } from "./components";
import { UpdateProfileImage } from "./components/profile";

export default function LeftSidebar({openedComponentId}) {
  const [show, setshow] = useState(false);
  const [currentComponentOpend, setcurrentComponentOpend] = useState<React.ReactElement>();
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showUpdateUserProfileModal, setShowUpdateUserProfileModal] = useState(false);

 function dialogCloser() {
   setShowAddChannelModal(false)
   setShowUpdateUserProfileModal(false)
  }


 const {publicChannels, privateChannels} = useSelector((state: any) => state.channel);


 
useEffect(() => {
  
  switch (openedComponentId) {
    case 1:
      setcurrentComponentOpend(<ChatSideBarComponent showAddChannelModal setShowAddChannelModal={() => setShowAddChannelModal(!showAddChannelModal)} privateChannels={privateChannels} publicChannels={publicChannels}/>)  
      break;
    case 5:
       setcurrentComponentOpend(<ProfileComponent  showUpdateUserProfileModal setshowModal={() => setShowUpdateUserProfileModal(!showUpdateUserProfileModal)}/>)
      break;
  
    default:
      break;
  }
  return () => {
    
  }
}, [publicChannels,privateChannels, openedComponentId])


 
  return (
    <div className="flex-2 sm:w-[330px] w-1/6      hidden sm:block">
        <DialogComponent toggleFunc={dialogCloser} toggle={showAddChannelModal} child={<AddChannel dialogCloser={dialogCloser} />} />
        <DialogComponent toggleFunc={dialogCloser} toggle={showUpdateUserProfileModal} child={<UpdateProfileImage dialogCloser={dialogCloser} />} />
        {
        currentComponentOpend 
        }
    
  </div>
  );
}







