import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://eko-server.onrender.com";
export const createEvent = createAsyncThunk(
    "event/createEvent", async (body) => {
        try{
        const request = await axios.post(`${baseUrl}/events/create`, body, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        const response = request.data;
        return response;
    }
        catch(err){
            console.log(err);
            return err.message;
        } 
    }
);


const EventSlice = createSlice({
    name: 'event',
    initialState: {
        loading: false,
        event: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(createEvent.pending, (state, action) => {
            state.loading = true;
            state.event = null;
            state.error = null;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.event = null;
            }else{
                state.event = action.payload.data;
                state.error = null;
            }
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.loading = false;
            state.event = null;
            state.error =action.error.message
        })
    }
});

export default EventSlice.reducer;