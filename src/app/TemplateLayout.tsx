'use client';
import React, { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSideBar/LeftSidebar";
import RightSidebar from "@/components/RideSideBar/RightSidebar";
import { usePathname } from "next/navigation";
import { useGetUsers } from "./lib/services/users.sevice";
import { useApp } from "./lib/context/AppContext";
import { useAuth } from "./lib/context/AuthContext";

interface TemplateLayoutProps {
  children: React.ReactNode;
}

export default function TemplateLayout({ children }: TemplateLayoutProps) {
  const pathname = usePathname(); // Get the current path

  // List of routes that shouldn't be wrapped with TemplateLayout
  const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

  const isAuthRoute = authRoutes.includes(String(pathname));
  const { leftDrawerStatus, rightDrawerStatus, toggleLeftDrawer, toggleRightDrawer } = useApp();
  const [isStatic, setIsStatic] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 720) {
        setIsStatic(true);
        toggleLeftDrawer();
        toggleRightDrawer();
      } else {
        setIsStatic(false);
        toggleLeftDrawer();
        toggleRightDrawer();
      }
    };


    handleResize(); // Check the screen size on initial load
    window.addEventListener("resize", handleResize); // Add event listener for resizing

    return () => window.removeEventListener("resize", handleResize); // Clean up on unmount
  }, [isStatic, toggleLeftDrawer, toggleRightDrawer]);



  return (

    isAuthRoute ? (<>{children}</>) : (<div className=" flex flex-col md:flex-row h-full p-10 bg-blue-gray-100 bg-opacity-50">
      {/* Left Sidebar */}
      <LeftSidebar
        open={leftDrawerStatus}
        toggleDrawer={toggleLeftDrawer}
        isStatic={isStatic}
      />

      {/* Main Content */}
      <main className="flex-1 h-full">{children}</main>

      {/* Right Sidebar */}
      <RightSidebar
        open={rightDrawerStatus}
        toggleDrawer={toggleRightDrawer}
        isStatic={isStatic}
      />
    </div>)
  );
}
