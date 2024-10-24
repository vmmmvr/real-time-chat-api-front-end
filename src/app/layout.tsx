import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./lib/providers/ReactQueryProvider";
import TemplateLayout from "./TemplateLayout";


export const metadata: Metadata = {
  title: "Chatio | Home",
  description: "your best dev messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags from metadata are automatically applied by Next.js */}
      </head>
      <body className=" w-full h-full ">
        <ReactQueryProvider>
             <TemplateLayout>
              {children}
              </TemplateLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
