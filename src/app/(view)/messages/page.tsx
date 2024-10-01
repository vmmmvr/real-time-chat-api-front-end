// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { HiMenu } from "react-icons/hi";
import MessageTimeline from "@/app/components/MessagesTimeline/MessageTimeline";

export default function HomePage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsStatic(true);
        setLeftOpen(true);
        setRightOpen(true);
      } else {
        setIsStatic(false);
        setLeftOpen(false);
        setRightOpen(false);
      }
    };

    handleResize(); // Check the screen size on initial load
    window.addEventListener("resize", handleResize); // Add event listener for resizing

    return () => window.removeEventListener("resize", handleResize); // Clean up on unmount
  }, []);

  const toggleLeftDrawer = () => {
    setLeftOpen(!leftOpen);
  };

  const toggleRightDrawer = () => {
    setRightOpen(!rightOpen);
  };

  return (
    <>
     {/* Middle Column (Message Timeline) */}
     <MessageTimeline
        toggleRightDrawer={toggleRightDrawer}
        isStatic={isStatic}
      />
    </>
  );
}
