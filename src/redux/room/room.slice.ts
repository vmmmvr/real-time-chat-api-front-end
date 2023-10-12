import { Slice, createSlice } from "@reduxjs/toolkit";
import { MessageSliceProps, RoomSliceProps } from "../../types";
import { createARoomThunk, getRoomDataThunk } from "./room.thunk";

const roomSlice : Slice<RoomSliceProps> = createSlice({
    name: "room",
    initialState: {
        room: null,
        status: 'idle',
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // create
        .addCase(createARoomThunk.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(createARoomThunk.fulfilled, (state,action) => {
            state.status = 'success';
        })
        .addCase(createARoomThunk.rejected, (state,action) => {
            state.status = 'failed';
        })

        // get
        .addCase(getRoomDataThunk.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(getRoomDataThunk.fulfilled, (state,action) => {
                state.room= action.payload
            state.status = 'success';
            
        })
        .addCase(getRoomDataThunk.rejected, (state,action) => {
            state.status = 'failed';
        })
    }
});


export default roomSlice.reducer;