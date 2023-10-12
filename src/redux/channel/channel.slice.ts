import { Slice, createSlice } from "@reduxjs/toolkit";
import { createChannelsThunk, getAchannelThunk, loadPrivateChannelsThunk, loadPublicChannelsThunk } from "./channel.thunk";
import { ChannelSliceProps } from "../../types";

const channelSlice: Slice<ChannelSliceProps> = createSlice({
    name: "channel",
initialState: {
    status: "idle",
    publicChannels: [],
    privateChannels: [],
    myChannels: [],
    openedChannel: {}
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
      // get private channels
       .addCase(loadPrivateChannelsThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadPrivateChannelsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.privateChannels = action.payload
        
      })
      .addCase(loadPrivateChannelsThunk.rejected, (state, action) => {
        state.status = "failed";
      })
       // create channel
       .addCase(createChannelsThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createChannelsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
    
        
      })
      .addCase(createChannelsThunk.rejected, (state, action) => {
        state.status = "failed";
      })
       // get A channel
       .addCase(getAchannelThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAchannelThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
          state.openedChannel = {...action.payload}
        
      })
      .addCase(getAchannelThunk.rejected, (state, action) => {
        state.status = "failed";
      })
}
});

export default channelSlice.reducer;