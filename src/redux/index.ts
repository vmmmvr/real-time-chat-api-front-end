import store from './store';
import {getUserThunk, loginThunk, logoutUserThunk, registerThunk} from "./auth/auth.thunk";
import {createChannelsThunk, getAchannelThunk,loadPrivateChannelsThunk, loadPublicChannelsThunk} from "./channel/channel.thunk";
import {sendMessageThunk} from "./messages/message.thunk";
import {createARoomThunk, getRoomDataThunk} from "./room/room.thunk"

export  {
    store,
    getUserThunk, loginThunk, logoutUserThunk, registerThunk,
    createChannelsThunk, getAchannelThunk,loadPrivateChannelsThunk, loadPublicChannelsThunk,
    sendMessageThunk,
    createARoomThunk, getRoomDataThunk
}