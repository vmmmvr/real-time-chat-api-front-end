import { useSelector } from "react-redux";
import { SendIcon } from "../../icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Room } from "../../types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AnyAction } from "redux";
import { sendMessageThunk } from "../../redux/messages/message.thunk";
import { getRoomDataThunk } from "../../redux/room/room.thunk";
import Loading from "../components/loading";
export default function Rooms() {
  const { uuid } = useParams();
  const { publicChannels } = useSelector((state: any) => state.channel);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const { user, accessToken, refreshToken } = useSelector(
    (state: any) => state.auth
  );

  const { room } = useSelector((state: any) => state.room);
  const roomLoadingStatus = useSelector((state: any) => state.room.status);
  const messageStatus = useSelector((state: any) => state.message.status);

  console.log({
    uuid,
    room,
  });

  useEffect(() => {
    dispatch(
      getRoomDataThunk({
        roomuuid: uuid ,
        accessToken,
        refreshToken,
      }) as unknown as AnyAction
    );
    return () => {};
  }, [publicChannels, messageStatus, uuid]);

  return (
    <div className="flex  flex-col text-center justify-between h-full  ">
      {roomLoadingStatus === "loading" ? (
        <div className=" w-full flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="border-b border-gray-100 py-2 flex-2">
            <h1 className="text-gray-600  font-bold">{room?.name}</h1>
            <small className="text-gray-400">
              last message
              <span> {room?.messages.length} </span>
              mins ago
            </small>
          </div>
          <div className="messages my-5 px-3 flex-1 flex flex-col justify-end ">
            <div className="flex flex-col my-2 text-start items-start border-b pb-3 border-slate-50">
             {
                room?.messages.map((msg) => (
                
               <div className="my-2 flex flex-row ">
                <img className="w-7 rounded-full" src="/avatar.svg" alt="pfp" />
              <div className="mx-2 flex  flex-col items-start text-gray-500">
                  <div key={msg.uuid}>
                    <div className="mb-2">
                      <span className="font-bold text-sm">
                        {msg.sender.name}
                      </span>{" "}
                      <small className="font-thin">{msg.createdAt}</small>
                    </div>

                    <span className="text-sm bg-slate-50 p-2 rounded-md">
                      {msg.message}
                    </span>
                  </div>
              </div>
               </div>

))

             } 
            </div>
          </div>

          <div className="px-3 flex-2">
            <form
              onSubmit={handleSubmit((data) => {
                console.log({
                  data,
                });
                dispatch(
                  sendMessageThunk({
                    message: data.message,
                    channeluuid: room?.channeluuid ?? "",
                    roomuuid: room?.uuid ?? "",
                    senderuuid: user?.uuid,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                  }) as unknown as AnyAction
                );

                setValue("message", null);
              })}
            >
              <textarea
                {...register("message", { required: true })}
                className=" w-full text-sm text-gray-600 outline-none border border-gray-300 px-3 py-2 rounded-md"
                name="message"
                placeholder="send message"
                id=""
              ></textarea>
              <small className="text-red-500">
                {" "}
                {errors.message?.type === "required" &&
                  "channel Name is required"}{" "}
              </small>

              <button
                type="submit"
                className="bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md flex flex-row"
              >
                <span>Send</span> <SendIcon />
              </button>

              {/* <button className="bg-primary px-5 py-2 text-white text-sm rounded-md">Create A Channel</button> */}
            </form>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
}
