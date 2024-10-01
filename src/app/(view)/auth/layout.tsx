// app/auth/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Chatio | Auth",
  description: "Your best dev messaging app",
};

export default function TemplateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
       {/* Children Section */}
       <div className="flex items-center justify-center w-full lg:w-1/3 p-6 lg:min-h-screen bg-white flex-0">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
     
      {/* Static Image Section */}
      <div className="relative w-full lg:w-2/3 h-64 lg:h-auto lg:min-h-screen flex-1 bg-primary-700">
        <Image
          src="/img/Girl-Workplace.svg" // Updated image path
          alt="Authentication Image"
          layout="fill"
          objectFit="cover"
          className="block"
        />
      </div>
    </div>
  );
}
