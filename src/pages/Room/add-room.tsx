import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { createARoomThunk, loadPublicChannelsThunk, loadPrivateChannelsThunk } from "@/redux";

export default function AddRoom({dialogCloser}: {dialogCloser: Function}) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [enabled, setEnabled] = useState(false)
    const dispatch = useDispatch();
    const {accessToken, refreshToken} = useSelector((state: any) => state.auth);
    const {openedChannel} = useSelector((state: any) => state.channel);
  
    return (
    <>
      <div className="mt-2 w-full">
      <form className=" md:p-0 p-4 w-full flex flex-col" onSubmit={handleSubmit((data) => {
          console.log({
              data,
              enabled
          });

          Promise.resolve(    dispatch(createARoomThunk( {
            name: data.name,
            enabled,
            channeluuid: openedChannel.uuid,
        accessToken, refreshToken}) as unknown as AnyAction)).then(( ()=> {
          dispatch(loadPublicChannelsThunk() as unknown as AnyAction)
          

          })).then(() => dispatch(loadPrivateChannelsThunk({accessToken, refreshToken}) as unknown as AnyAction))
      
          dialogCloser()
          
      })}>
        
              <div className="flex flex-col mb-5">
                <label className="text-gray-500 mb-1" htmlFor="name">Room Name</label>
                <input {...register("name", {required: true})} placeholder="Room Name" type="text" 
                className="ring-1 ring-secondary text-gray-600   rounded-md px-3 py-1 focus:ring-1 focus:ring-secondary outline-0   " />
                  <small className="text-red-500">  {errors.name?.type === 'required' && "channel Name is required"} </small>
              
              </div>  
              <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-primary' : 'bg-secondary'}
           my-3 relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors 
            duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-3' : 'translate-x-0'}
              pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
            
              <button className="bg-primary px-5 py-2 text-white text-sm rounded-md" type="submit">Create A Room</button>
            </form>
              </div>
  
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => dialogCloser()}
                >
                  Close
                </button>
              </div>
              </>
    )
}
