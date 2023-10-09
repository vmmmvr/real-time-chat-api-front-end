import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import channelReducer from "./channel/channel.slice";

const rootReducer = combineReducers({
    //combine all reducers
    auth: authReducer,
    channel: channelReducer
  })

 const store  = configureStore({
    reducer:rootReducer
})

export default  store