'use client';
import { CustomTextArea } from "@/app/components/CustomTextArea/CustomTextArea";
import { colorsList, getIndexColor, missingProperties } from "@/app/lib/utils/utils";
import { Textarea, Typography } from "@material-tailwind/react";


export default function UserProfile({ params }: { params: { username: string } }) {
  const { username } = params;

  if (!username) {
    return <p>Loading...</p>;
  }

  // Fetch user data based on username or use passed data

  return (
    <div className="flex flex-col justify-between flex-1 w-full">
      <div className="flex items-center gap-2">
        <div className={`max-w-16 max-h-16 rounded-full w-full bg-gradient-to-r ${colorsList[getIndexColor(1)]}`}></div>
        <div className="flex flex-col">
          <span className="capitalize">{username}</span>
          <Typography className='font-normal text-gray-400 text-sm' {...missingProperties}>@{username?.slice(0, 6)}</Typography>
        </div>
      </div>
      <div>
        <MessageComponent username={username} />
      </div>
      <CustomTextArea />
    </div>
  );
}


function MessageComponent(props: { username: string }) {
  return (
    <div className="flex items-start gap-2 w-full">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorsList[getIndexColor(1)]}`}></div>
      <div className="flex flex-col gap-2 w-full">
        <span className="capitalize">{props.username}</span>
        <div className="bg-blue-gray-100/40 p-4 rounded-lg w-full">
          <p >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum mollitia laboriosam maxime harum vero laborum dolores, rem nisi,
          </p>
        </div>

      </div>
    </div>
  )
}