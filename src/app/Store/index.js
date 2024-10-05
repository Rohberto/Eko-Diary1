import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import eventReducer from "./EventSlice";
import eventsReducer from "./EventsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
        events: eventsReducer
    }
});

export default store;