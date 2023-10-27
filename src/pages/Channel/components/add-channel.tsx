import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { createChannelsThunk } from '@/redux';

export default function AddChannel({dialogCloser}: {dialogCloser: Function}) {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [enabled, setEnabled] = useState(false)
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const user = useSelector((state: any) => state.auth.user);

  return (
  <>
    <div className="mt-2 w-full">
    <form className=" md:p-0 p-4 w-full flex flex-col" onSubmit={handleSubmit((data) => {
        dispatch(createChannelsThunk({input: {
            name: data.name,
            private: enabled,
            useruuid: user.uuid
        },accessToken, refreshToken}) as unknown as AnyAction)
        dialogCloser()
    })}>
      
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 text-sm mb-1" htmlFor="name">Channel Name</label>
              <input {...register("name", {required: true})} placeholder="Channel Name" type="text" 
              className="ring-1 ring-secondary text-gray-600   rounded-md px-3 py-2 focus:ring-1 focus:ring-secondary outline-0   " />
                <small className="text-red-500">  {errors.name?.type === 'required' && "channel Name is required"} </small>
            
            </div>  
          <div className='flex flex-col' >
            <label className='text-gray-500 text-sm' htmlFor="Private ">Private</label>
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
          </div>
          
            <button className="bg-primary px-5 py-3 text-white text-sm rounded-md" type="submit">Create A Channel</button>
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
