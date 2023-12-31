import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthCreditential, UserProps } from "../../types";

export const registerThunk = createAsyncThunk("/auth/register", async (userData, {rejectWithValue}) => {
    try {
   

      const {name, email, password} = userData;

      const res =  await  axios.post('http://localhost:1330/api/user', {
          name, email, password
        }, {
          headers: {
            "Content-Type":"Application/json"
          }
        })
        console.log(userData?.image[0]);
        
    
       if(res.data && userData?.image[0]) {
        const formData = new FormData()
        formData.append("profile_image", userData.image[0], `${res.data.uuid}-user-profile.jpg`);
          
        await  axios.post(`http://localhost:1330/api/user/image/${res.data.uuid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
       }
          
      
      const {data} = res;
      
        return data;
    } catch (error: any) {
            console.log({
                error
            });
          return  rejectWithValue({
                errorCode: error?.response?.status,
                errorMessage: error?.response?.data?.[0] ?? error.response.data
            }) 
    }
   
  });
export const loginThunk = createAsyncThunk("/auth/login", async ({email, password}: UserProps, {rejectWithValue}) => {
    try {
        const res = await  axios.post('http://localhost:1330/api/sessions',  {
            email,
            password
         }, {
          withCredentials: true,
          
            headers: {
              "Content-Type":"Application/json"
            }
          })
          
      
      const {data} = res;
      
        return data;
    } catch (error: any) {
            console.log({
                error
            });
          return  rejectWithValue({
                errorCode: error?.response?.status,
                errorMessage: error?.response?.data?.[0] ?? error.response.data
            }) 
    }
   
  });
export const getUserThunk = createAsyncThunk("/auth/me", async ({accessToken, refreshToken} : AuthCreditential, {rejectWithValue}) => {
    try {
   
        const res = await  axios.get('http://localhost:1330/api/me',   {
          // withCredentials: true,
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
export const logoutUserThunk = createAsyncThunk("/auth/logout", async ({accessToken, refreshToken} : AuthCreditential, {rejectWithValue}) => {
    try {
 
        const res = await  axios.delete('http://localhost:1330/api/sessions',   {
          // withCredentials: true,
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