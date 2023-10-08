import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { ArrowDown, ArrowRight } from "../../icons";

export default function LeftSidebar() {
  const [show, setshow] = useState(false);

  console.log({
    show,
  });

  return (
    <div className="w-1/6 bg-white rounded-md p-3 h-56 hidden sm:block">
      <div>
        <h4 className="text-gray-500">Channels</h4>
        <div className="pt-5">
          <div className="bg-white rounded-md p-2">
            {/* room  */}
            <div
              className="flex flex-row justify-between cursor-pointer hover:bg-secondary p-2 rounded-md"
              onClick={() => setshow(!show)}
            >
              <h5 className="text-primary">NodeJs</h5>
            
            <div className="flex flex-row">
            <span className="text-xs bg-primary text-white py-1 px-2 rounded-full">
                9+
              </span>
            {show ? <ArrowRight />   :<ArrowDown />} 
            </div>
            </div>
            {
              <div
                className={
                  `flex flex-col p-2 transition ease-in-out px-5 ` +
                  (show && `hidden`)
                }
              >
                <div className="py-2 my-1 flex flex-row items-center justify-between  hover:bg-secondary cursor-pointer rounded-md px-2">
                  <span className="text-xs text-gray-500">Room 1</span>
                  <div className="flex flex-row">
                  <span className="text-xs bg-primary text-white py-1 px-2 rounded-full">
                    3
                  </span>
                  <ArrowRight  />
                    </div>
                
                </div>
                <div className="py-2 my-1 hover:bg-secondary cursor-pointer rounded-md px-2">
                  <span className="text-xs text-gray-500">Room 2</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
