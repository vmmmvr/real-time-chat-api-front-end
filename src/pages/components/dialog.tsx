import { Dialog } from '@headlessui/react'
import  { useState, ReactElement } from 'react'

export default function DialogComponent({toggle ,toggleFunc, child ,title}: {toggle: boolean, toggleFunc: Function, title?: ReactElement,child: ReactElement}) {

  
    
  return (
    <div>
        <Dialog as="div" className="relative z-10" open={toggle} onClose={() => toggleFunc()}>

<div className="fixed inset-0 bg-black bg-opacity-25" />


<div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
     
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
             {
                title
             }
            </Dialog.Title>
          {
            child
          }
          </Dialog.Panel>
      </div>
    </div>
</Dialog>
    </div>
  )
}
