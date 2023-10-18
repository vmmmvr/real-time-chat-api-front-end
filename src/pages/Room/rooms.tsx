import { useSelector } from "react-redux";
import { SendIcon } from "../components/icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
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
        roomuuid: uuid ?? "",
        accessToken,
        refreshToken,
      }) as unknown as AnyAction
    );
    return () => {};
  }, [publicChannels, messageStatus, uuid]);

  return (
    <div className="flex  flex-col text-center justify-between h-full w-full  ">
      {roomLoadingStatus === "loading" ? (
        <div className=" w-full flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-between py-5">
          <div className="border-b border-gray-100 py-2 flex-2">
            <h1 className="text-gray-600  font-bold">{room?.name}</h1>
            <small className="text-gray-400">
              last message
              <span> {room?.messages.length} </span>
              mins ago
            </small>
          </div>
            <div className="flex flex-col my-2 w-full px-5  overflow-auto text-start items-end border-b pb-3 border-slate-50">
             {
                room?.messages.map((msg) => (
                msg.sender.uuid === user.uuid ? 
                <div className="flex w-full items-start justify-end">
                  <div className="my-2 flex flex-row   ">
                  
                  <div className="mx-2 flex  flex-col items-start text-gray-500">
                      <div key={msg.uuid} className="flex flex-col text-end" >
                       
                          <div className="mb-2">
                            <small className="font-thin mx-2 text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</small>
                            <span className="font-bold text-sm">
                              {msg.sender.name}
                            </span>{" "}
                          </div>
                          <span className="text-sm bg-slate-50 p-2 rounded-md">
                            {msg.message}
                          </span>
                      </div>
                  </div>
                  <img className="w-7 rounded-full" src="/avatar.svg" alt="pfp" />
               </div>
                </div>
                
                :
               <div className="my-2 flex flex-row w-full items-start">
                <img className="w-7 rounded-full" src="/avatar.svg" alt="pfp" />
              <div className="mx-2 flex  flex-col items-start text-gray-500">
                  <div key={msg.uuid} className="flex flex-col text-start">
                    <div className="mb-2">
                      <span className="font-bold text-sm">
                        {msg.sender.name}
                      </span>{" "}
                      <small className="font-thin mx-2 text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</small>
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

          <div className="px-3 relative flex-2">
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
        </div>
      )}
    </div>
  );
}
