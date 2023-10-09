import { Slice, createSlice } from "@reduxjs/toolkit";
import { createChannelsThunk, loadPublicChannelsThunk } from "./channel.thunk";
import { ChannelSliceProps } from "../../types";

const channelSlice: Slice<ChannelSliceProps> = createSlice({
    name: "channel",
initialState: {
    status: "idle",
    publicChannels: [],
    myChannels: [],
},
reducers: {},
extraReducers: (builder) => {
       // get channels
       builder.addCase(loadPublicChannelsThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadPublicChannelsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publicChannels = action.payload
        
      })
      .addCase(loadPublicChannelsThunk.rejected, (state, action) => {
        state.status = "failed";
      })
       // create channel
       builder.addCase(createChannelsThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createChannelsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
    
        
      })
      .addCase(createChannelsThunk.rejected, (state, action) => {
        state.status = "failed";
      })
}
});

export default channelSlice.reducer;