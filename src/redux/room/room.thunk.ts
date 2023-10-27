import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetRoomProps, CreateRoomThunk } from "../../types";
import axios from "axios";


export const createARoomThunk = createAsyncThunk("/api/rooms/create", async ({name, enabled, channeluuid, accessToken, refreshToken}: CreateRoomThunk, {rejectWithValue}) => {
    try {
   
      
        
        const res = await  axios.post(`http://localhost:1330/api/rooms`,{
          name,
          private: enabled,
          channeluuid
        }, {
          withCredentials: true,
            headers: {
              "x-refresh": refreshToken,
              Authorization: `Bearer ${accessToken}`
            }
          })
          
            
      
      const {data} = res;
    
    
      
        return data;
    } catch (error: any) {
         
          return  rejectWithValue({
                errorCode: error?.response?.status,
                errorMessage: error?.response?.data?.[0] ?? error.response.data
            }) 
    }
   
  });

export const getRoomDataThunk = createAsyncThunk("/api/rooms/roomuuid", async ({roomuuid, accessToken, refreshToken}: GetRoomProps, {rejectWithValue}) => {
    try {
   
      
        
        const res = await  axios.get(`http://localhost:1330/api/rooms/${roomuuid}`, {
          withCredentials: true,
            headers: {
              "x-refresh": refreshToken,
              Authorization: `Bearer ${accessToken}`
            }
          })
          
            
      
      const {data} = res;
    
    
      
        return data;
    } catch (error: any) {
         
          return  rejectWithValue({
                errorCode: error?.response?.status,
                errorMessage: error?.response?.data?.[0] ?? error.response.data
            }) 
    }
   
  });