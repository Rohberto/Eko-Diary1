import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://eko-server.onrender.com";
export const getAllEvents = createAsyncThunk("events/getAllEvents", async () => {

    try{
        const request = await axios.get(`${baseUrl}/events`);
        const response = request.data;
        return response;
    
    }catch(err){
        console.log(err.message);
        return err.message;
    }
})



const EventsSlice = createSlice({
    name: 'events',
    initialState: {
        loading: true,
        events: [],
        error: null
    },
    reducers: {
        addEvent: (state, action) => {
         state.loading = false;
         state.events = action.payload;
         state.error = null;
        }, 
        updateDeletedEvent: (state, action) => {
            state.loading = false;
            state.events = action.payload;
            state.error = null;
        }
      },
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.pending, (state, action) => {
            state.loading = true;
            state.events = [];
            state.error = null;
        })
        .addCase(getAllEvents.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.events = [];
            }else if(action.payload.status === "SUCCESS"){
                state.events = action.payload.data.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date);
                  });
                state.error = null;
            }else {
                state.error = action.payload;
                state.events = [];
            }
        })
        .addCase(getAllEvents.rejected, (state, action) => {
           console.log(action);
            state.loading = false;
            state.events = [];
            state.error  = action.error.message
        })
      
    }
})
export const {addEvent, updateDeletedEvent} = EventsSlice.actions;
export default EventsSlice.reducer;