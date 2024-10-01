// components/RightSidebar.tsx
'use client';

import { useAuth } from '@/app/lib/context/AuthContext';
import { useAddFriend, useRemoveFriend } from '@/app/lib/services/users.sevice';
import { User, Users } from '@/app/lib/types/user';
import { missingProperties } from '@/app/lib/utils/utils';
import { Drawer, Button, Typography, Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import cookies from 'js-cookie';
import { redirect } from 'next/navigation';


const colorsList = [
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-green-400 via-teal-500 to-blue-600",
  "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
  "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600",
  "bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500",
  "bg-gradient-to-r from-teal-300 via-green-400 to-lime-500",
  "bg-gradient-to-r from-primary-200 via-primary-300 to-primary-600"
]

const getIndexColor = (index: number) => {
  return Number(index) < Number(colorsList.length) ? index : Number(index) % Number(colorsList.length);
};

export default function RightSidebar({ open, toggleDrawer, isStatic, allUsers, allUsersLoading, refreshGetUsers }: { open: boolean, toggleDrawer: () => void, allUsersLoading: boolean, isStatic: boolean, allUsers: Users, refreshGetUsers: () => void }) {
  const [selectedUser, setSelectedUser] = useState<String | undefined>("");

  const { mutateAsync: addFriend, isPending: addFriendLoading, error: addFriendError } = useAddFriend(selectedUser);
  const { mutateAsync: removeFriend, isPending: removeFriendLoading, error: removeFriendError } = useRemoveFriend(selectedUser);

  const { user, refreshGetMe } = useAuth();

  function handleAddFriend(username?: String) {
    setSelectedUser(username);
    addFriend().then(data => {
      refreshGetMe();
      refreshGetUsers();
    });
  }

  function handleRemoveFriend(username?: String) {
    setSelectedUser(username);
    removeFriend().then(data => {
      refreshGetMe();
      refreshGetUsers();
    });
  }


  const loading = addFriendLoading || removeFriendLoading;

  return (
    <>
      {isStatic ? (
        <div className="p-4 bg-white shadow-md w-full  flex flex-col  max-w-[300px] rounded-e-3xl divide-y-2 divide-gray-100">
         {
            allUsersLoading  ? <div className='w-full h-full flex justify-center items-center'>
          <Spinner className="h-10 w-10 border-primary-main" {...missingProperties} />
            </div> : <DrawerComponent user={user} allUsers={allUsers} handleAddFriend={handleAddFriend} handleRemoveFriend={handleRemoveFriend} />
          }
        </div>
      ) : (
        <Drawer
          open={open}
          onClose={toggleDrawer}
          className="p-4"
          placement="right"
          size={250} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <div className="flex flex-col h-full">
            <DrawerComponent user={user} allUsers={allUsers} handleAddFriend={handleAddFriend} handleRemoveFriend={handleRemoveFriend} />
          </div>
        </Drawer>
      )}
    </>
  );
}


function DrawerComponent(props: { user: User, handleRemoveFriend: (username?: String) => void, handleAddFriend: (username?: String) => void, allUsers: Users }) {
  return (
    <>
      <div className="flex mb-5 flex-col w-full">
        <Typography   {...missingProperties} variant="h4" color="blue-gray" className="my-2">
          Friends
        </Typography>
        <div className="flex flex-col gap-2">
          {
            props?.user?.friends?.map((friend: User, index) => {

              return (
                <div key={String(friend._id)} className='flex items-center justify-between gap-2'>
                  <div className='flex gap-3 items-center'>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorsList[getIndexColor(index)]}`}></div>
                    <div className='flex flex-col'>
                      <Typography className='font-medium' {...missingProperties}>{friend.name?.slice(0, 6)}</Typography>
                      <Typography className='font-normal text-gray-400 text-sm' {...missingProperties}>@{friend.username?.slice(0, 6)}</Typography>
                    </div>
                  </div>
                  <Button onClick={() => props?.handleRemoveFriend(friend?.username)} {...missingProperties} className="bg-red-400 px-3 capitalize">
                    Remove
                  </Button>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='flex flex-col h-full flex-1 w-full'>
        <Typography   {...missingProperties} variant="h4" color="blue-gray" className="my-2">
          People
        </Typography>
        <div className=" overflow-y-auto  h-full px-2 ">
          {
            props?.allUsers?.map(user => (
              <div key={String(user._id)} className='flex items-center justify-between  my-3'>
                <div className='flex gap-3 items-center'>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorsList[Math.round(Math.random())]}`}></div>
                  <div className='flex flex-col'>
                    <Typography className='font-medium' {...missingProperties}>{user?.name?.slice(0, 8)}</Typography>
                    <Typography className='font-normal text-gray-400 text-sm' {...missingProperties}>@${user.username?.slice(0, 5)}...</Typography>
                  </div>
                </div>
                <Button onClick={() => props?.handleAddFriend(user?.username)} {...missingProperties} className="bg-primary-main px-3 capitalize">
                  Add
                </Button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}