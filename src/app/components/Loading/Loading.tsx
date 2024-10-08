import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner  className="  border-t-primary-main border-r-primary-main" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </div>
  );
}
