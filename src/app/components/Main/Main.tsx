import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col justify-between md:justify-center items-center bg-white p-5 rounded-lg md:rounded-none">
            <MainNavBar />
            {
                children
            }
        </div>

    )
}
