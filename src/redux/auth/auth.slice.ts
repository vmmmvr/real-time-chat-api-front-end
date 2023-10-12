import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, logoutUserThunk } from "./auth.thunk";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: "idle",
        user: null,
        accessToken:  localStorage.getItem('rtca_access_token'), refreshToken: localStorage.getItem('rtca_refresh_token'),
    error: null,

    },
    reducers: {
    //  loadUser: (state, action)=> {
    //         state.user = action.payload
    //  }
    },
    extraReducers(builder) {
        builder
        .addCase(loginThunk.pending, (state) => {
            state.error = null;
          state.status = "loading";
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          // Add any fetched posts to the array

          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken

          localStorage.setItem('rtca_access_token', state.accessToken ?? '')
          localStorage.setItem('rtca_refresh_token', state.refreshToken ?? '')

          
        })
        .addCase(loginThunk.rejected, (state, action : any) => {
          state.status = "failed";
          state.error =  action.payload.errorMessage ?? "";
      
          
        })

        // get user
        .addCase(getUserThunk.pending, (state) => {
          state.status = "loading";
        }).
        addCase(getUserThunk.fulfilled, (state,action) => {
          state.status = "succeeded";

          state.user = action.payload
          
        }).
        addCase(getUserThunk.rejected, (state,action) => {
          state.status = "failed";  
     
          
          state.error = action?.payload.errorMessage.error
        })

        // logout
        .addCase(logoutUserThunk.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(logoutUserThunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          
        })
        .addCase(logoutUserThunk.rejected, (state, action) => {
          state.status = "failed";
        })
    }
})
// reducers

export default authSlice.reducer;