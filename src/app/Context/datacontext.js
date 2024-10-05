"use client"
import React, { createContext, useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../Store/UserSlice';
import { getAllEvents } from '../Store/EventsSlice';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [otp, setOtp] = useState("");
    const handleChangeOtp = (newOtp) => {
      setOtp(newOtp);
    };
   
  const dispatch = useDispatch();
  const socket = socketIO.connect('https://eko-server.onrender.com');
  useEffect(() => {
    socket.on("connect", () => console.log(`This is Socket.id: ${socket.id}`));
  }, []);
  
  
   useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
       const foundUser = JSON.parse(loggedInUser);
       dispatch(isLoggedIn(foundUser));
      }
      dispatch(getAllEvents());
    }, []);
   
    return (
        <DataContext.Provider value={{socket, handleChangeOtp}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
