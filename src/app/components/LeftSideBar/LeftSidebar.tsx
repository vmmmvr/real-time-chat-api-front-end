// components/Sidebar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Drawer, List, ListItem } from "@material-tailwind/react";
import { LuMessageSquare } from "react-icons/lu";
import { FiInbox, FiSettings } from "react-icons/fi";
import Link from "next/link";
import { missingProperties } from "@/app/lib/utils/utils";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { TiHome } from "react-icons/ti";
import { redirect, usePathname } from "next/navigation";
import cookies from "js-cookie";

export default function LeftSidebar({ open, toggleDrawer, isStatic }: { open: boolean, toggleDrawer: () => void, isStatic: boolean, }) {

  const handleLogout = () => {
    cookies.remove('refreshToken');
    cookies.remove('accessToken');
    // Redirect user after successful sign-in
    window.location.reload();
  }
  return (
    <>
      {isStatic ? (
        <FullDrawer handleLogout={handleLogout} />
      ) : (
        <Drawer
          open={open}
          onClose={toggleDrawer}
          className="p-4 flex flex-col justify-between"
          placement="left"
          size={250} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <div className="flex flex-col gap-10">
            <Link className="flex gap-2 items-center" href={"/"}>
              <TbMessageChatbotFilled size={28} className="text-primary-main" />
              <span className="text-sm text-gray-600">Chat IO</span>
            </Link>
            <MenuComponent />
          </div>
          <div className="flex justify-between">
            <Button onClick={handleLogout} className="bg-red-600" {...missingProperties}>
              Logout
            </Button>
            <Button className="bg-primary-main"  {...missingProperties}>
              <FiSettings size={16} />
            </Button>

          </div>
        </Drawer>
      )}
    </>
  );
}

const FullDrawer = (props: {handleLogout: () => void}) => {
  return (
    <div className="p-4  flex flex-col justify-between bg-white shadow-md z-50 h-full rounded-s-3xl">
      <div className="flex flex-col gap-10">
        <Link className="flex gap-2 items-center" href={"/"}>
          <TbMessageChatbotFilled size={28} className="text-primary-main" />
          <span className="text-sm text-gray-600">Chat IO</span>
        </Link>
        <MenuComponent />
      </div>
      <div className="flex justify-between">
        <Button onClick={props.handleLogout} className="bg-red-600 capitalize" {...missingProperties}>
          Logout
        </Button>
        <Button className="bg-primary-main"  {...missingProperties}>
          <FiSettings size={16} />
        </Button>

      </div>
    </div>
  )
}
const MenuComponent = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Home",
      icon: TiHome,
      url: "/",
    },
    {
      title: "Inbox",
      icon: FiInbox,
      url: "/inbox",
    },
    {
      title: "Direct Messages",
      icon: LuMessageSquare,
      url: "/direct-messages",
      badge: 2,
    },
    // {
    //   title: "Settings",
    //   icon: FiSettings,
    //   url: "/settings",
    // },
  ];
  return (
    <List className="px-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
      {menuItems.map((item, index) => (
        <ListItem key={index} className={`flex items-center justify-between ${pathname === item.url ? "bg-primary-main text-white " : ""} hover:text-primary-main hover:bg-primary-100 w-full  max-w-[200px] md:max-w-[300px]`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
          <Link href={item.url} className="flex items-center gap-2 w-full">
            <item.icon size={18} className={`${pathname === item.url ? "  " : "text-primary-main"} `} />
            <span className="font-normal text-sm">{item.title}</span>
          </Link>
          {item.badge && (
            <div className="bg-primary-main text-white w-5 h-5 text-xs flex justify-center items-center rounded-md">
              <span>{item.badge}</span>
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );
};
