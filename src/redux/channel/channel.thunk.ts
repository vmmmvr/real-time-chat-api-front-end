import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthCreditential } from "../../types";

export const createChannelsThunk = createAsyncThunk("/api/channels", async ({input, accessToken, refreshToken}: AuthCreditential, {rejectWithValue}) => {
    try {
   
        const res = await  axios.post('http://localhost:1330/api/channels', {
            ...input
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

export const loadPublicChannelsThunk = createAsyncThunk("/channels/all", async (data, {rejectWithValue}) => {
    try {
   
        const res = await  axios.get('http://localhost:1330/api/channels',   {
          // withCredentials: true,
            headers: {
            //   "x-refresh": refreshToken,
            //   Authorization: `Bearer ${accessToken}`
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