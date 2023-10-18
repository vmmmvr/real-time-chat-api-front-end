import { Slice, createSlice } from "@reduxjs/toolkit";
import {  RoomSliceProps } from "../../types";
import { createARoomThunk, getRoomDataThunk } from "./room.thunk";

const roomSlice : Slice<RoomSliceProps | undefined> = createSlice({
    name: "room",
    initialState: {
        room: null,
        status: 'idle',
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // create
        .addCase(createARoomThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createARoomThunk.fulfilled, (state) => {
            state.status = 'success';
        })
        .addCase(createARoomThunk.rejected, (state) => {
            state.status = 'failed';
        })

        // get
        .addCase(getRoomDataThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getRoomDataThunk.fulfilled, (state,action) => {
                state.room= action.payload
            state.status = 'success';
            
        })
        .addCase(getRoomDataThunk.rejected, (state) => {
            state.status = 'failed';
        })
    }
});


export default roomSlice.reducer;