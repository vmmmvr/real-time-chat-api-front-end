import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center">
      <Spinner className="h-12 w-12 border-t-primary-600 border-r-primary-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </div>
  );
}
