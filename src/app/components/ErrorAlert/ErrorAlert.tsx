'use client';
import { Alert } from '@material-tailwind/react'
import React from 'react'

export default function ErrorAlert({message}: {message?: string}) {
  const [open, setOpen] = React.useState(true);
 
  return (
    <div className='absolute left-5 top-5'>
        <Alert  open={open} onClose={() => setOpen(false)} color="red" >{message ? message : "An error alert for showing message."} </Alert>
    </div>
  )
}
