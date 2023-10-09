import {  useState } from "react";
import { ArrowDown, ArrowRight } from "../../icons";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  const [show, setshow] = useState(false);


  return (
    <div className="flex-2 lg:w-1/5 w-1/6 bg-white rounded-md p-3 h-56 hidden sm:block">
      <div>
        <h4 className="text-gray-500">Channels</h4>
        <div className="pt-5">
       
        </div>
      </div>
    </div>
  );
}
