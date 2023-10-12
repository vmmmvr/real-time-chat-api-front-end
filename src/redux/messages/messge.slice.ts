import { Slice, createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk } from "./message.thunk";
import { MessageSliceProps } from "../../types";

const messageSlice : Slice<MessageSliceProps> = createSlice({
    name: "message",
    initialState: {
        message: null,
        openedRoomMessages: [],
        status: 'idle',
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendMessageThunk.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(sendMessageThunk.fulfilled, (state,action) => {
            state.status = 'success';
        })
        .addCase(sendMessageThunk.rejected, (state,action) => {
            state.status = 'failed';
        })
    }
});


export default messageSlice.reducer;