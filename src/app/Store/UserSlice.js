import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "https://eko-server.onrender.com";
export const loginuser = createAsyncThunk(
    "user/loginUser", async (userCredentials) => {
        try{
        const request = await axios.post(`${baseUrl}/auth/login`, userCredentials);
        const response = request.data;
        return response;
    }
        catch(err){
            console.log(err);
            return err.message;
        }
    }
);

export const signUser = createAsyncThunk("user/signUser", async (userCredentials) => {
    try{
        const request = await axios.post(`${baseUrl}/auth/signup`, userCredentials);
        const response = request.data;
        return response;
    }
        catch(err){
            return err.message;
        }
})

export const googleLoginUser = createAsyncThunk("user/googleLoginUser", 
    async (credentials) => {
        try{
const request = await axios.post(`${baseUrl}/auth/google-auth`, credentials);
const response = request.data;
return response;
        }catch (err) {
            return err.message;
        }
    }
    )

    export const verifyUser = createAsyncThunk("user/verifyUser", async (credentials) => {
        try{
            const request = await axios.post(`${baseUrl}/auth/verifyOtp`, credentials);
const response = request.data;
return response;
console.log(response);
        }catch(err){
            return err.message;
        }
    });

    export const forgotUser = createAsyncThunk("user/forgotUser", async (email) => {
        try{
            const request = await axios.post(`${baseUrl}/auth/forgotpassword`, {email});
            const response = request.data;
            return response;
        }catch (err){
          return err.message;
        }
    })
    //RESET USER
    export const resetUser = createAsyncThunk("user/restUser", async (details) => {
        try{
          
            const request = await axios.post(`${baseUrl}/auth/resetpassword/${details.id}/${details.token}`, {password: details.password});
        const response = request.data;
        return response;
        }catch(err) {
            return err.message;
        }
    })
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
  reducers: {
    isLoggedIn: (state, action) => {
     state.loading = false;
     state.user = action.payload;
     state.error = null;
    },
    loggedOut: (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
    }
  },
    extraReducers: (builder) => {
        builder
        .addCase(loginuser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginuser.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = null;
            }else{
                state.user = action.payload.data;
                state.error = null;
            }
        })
        .addCase(loginuser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error =action.error.message
        })
        .addCase(googleLoginUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(googleLoginUser.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = null;
            }else{
                state.user = action.payload.data;
                state.error = null;
            }
        })
        .addCase(googleLoginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error =action.error.message
        })
        .addCase(signUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(signUser.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = null;
            }else{
              
                state.user = action.payload.data;
                state.error = null;
            }
        })
        .addCase(signUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error =action.error.message
        })
        .addCase(verifyUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(verifyUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = null;
            }else{
                state.user = action.payload.data;
                state.error = null;
            }
        })
        .addCase(verifyUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error =action.error.message
        })
        .addCase(forgotUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(forgotUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = state.user;
            }else{
                state.user = state.user;
                state.error = null;
            }
        })
        .addCase(forgotUser.rejected, (state, action) => {
            state.loading = false;
            state.user = state.user;
            state.error =action.error.message
        })
        .addCase(resetUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(resetUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.user = state.user;
            }else{
                state.user = state.user;
                state.error = null;
            }
        })
        .addCase(resetUser.rejected, (state, action) => {
            state.loading = false;
            state.user = state.user;
            state.error =action.error.message
        })
    },
  

})
export const {isLoggedIn, loggedOut} = UserSlice.actions;
export default UserSlice.reducer;