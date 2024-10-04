// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { HiMenu } from "react-icons/hi";
import { missingProperties } from "./lib/utils/utils";
import io, { Socket } from 'socket.io-client';
import { FaUsers } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { useApp } from "./lib/context/AppContext";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// Set the correct URL for the Socket.IO server
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function HomePage() {
  const { toggleLeftDrawer, toggleRightDrawer} = useApp();

  // useEffect(() => {
  //   socket = io('http://localhost:4000', {
  //     transports: ['websocket', 'polling'], // Use these transport methods
  //   });
  //   socket.on("connect", () => console.log("connected"))
  //   // Listen for incoming messages
  //   socket.on('message', (data) => {
  //     // setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.off('message');
  //     socket.disconnect();
  //   };
  // }, []);




  return (
      <div className="w-full h-full flex flex-col justify-between md:justify-center items-center bg-white p-5 rounded-lg md:rounded-none">
       <div className="flex md:hidden justify-between items-center w-full ">
       <LuMenu className="cursor-pointer" onClick={toggleLeftDrawer} size={24}/>
       <FaUsers className="cursor-pointer" onClick={toggleRightDrawer}  size={24}/>
       </div>
         <div className="flex flex-col gap-5">
          <h4 className="font-bold text-4xl text-primary-main">Welcome to ChatIO</h4>
          <div className="flex justify-between">
            {/* <Button    {...missingProperties}  className="border border-primary-main capitalize bg-white text-primary-main">
              Inbox
            </Button>
            <Button    {...missingProperties}  className="bg-primary-main capitalize">
              Add Friends
            </Button> */}

            <div>

            </div>
          </div>
         </div>
      </div>
  );
}
