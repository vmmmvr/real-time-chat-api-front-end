import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendMessageProps } from "../../types";
import axios from "axios";


export const sendMessageThunk = createAsyncThunk("/api/messages", async ({message, roomuuid, channeluuid, senderuuid, accessToken, refreshToken}: SendMessageProps, {rejectWithValue}) => {
    try {
   
      
        
        const res = await  axios.post('http://localhost:1330/api/messages', {
            message, roomuuid, channeluuid, senderuuid
        }, {
          withCredentials: true,
            headers: {
              "x-refresh": refreshToken,
              Authorization: `Bearer ${accessToken}`
            }
          })
          
            
      
      const {data} = res;
    
      console.log({
        data
      });
      
        return data;
    } catch (error: any) {
         
          return  rejectWithValue({
                errorCode: error?.response?.status,
                errorMessage: error?.response?.data?.[0] ?? error.response.data
            }) 
    }
   
  });