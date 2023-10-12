import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import channelReducer from "./channel/channel.slice";
import  messageSlice from "./messages/messge.slice"
import roomSlice from "./room/room.slice";

const rootReducer = combineReducers({
    //combine all reducers
    auth: authReducer,
    channel: channelReducer,
    message: messageSlice,
    room: roomSlice
  })

 const store  = configureStore({
    reducer:rootReducer
})

export default  store