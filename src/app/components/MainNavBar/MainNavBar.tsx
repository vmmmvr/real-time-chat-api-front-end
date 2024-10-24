import { useApp } from '@/app/lib/context/AppContext';
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { LuMenu } from 'react-icons/lu'

export default function MainNavBar() {
    const { toggleLeftDrawer, toggleRightDrawer } = useApp();
    return (
        <div className="flex md:hidden justify-between items-center w-full ">
            <LuMenu className="cursor-pointer" onClick={toggleLeftDrawer} size={24} />
            <FaUsers className="cursor-pointer" onClick={toggleRightDrawer} size={24} />
        </div>
    )
}
