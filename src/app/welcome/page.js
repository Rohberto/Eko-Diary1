"use client"
import React, {useEffect} from 'react';
import WelcomeLogo from "../Images/welcome.svg";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export const runtime = "edge";
const Welcome = () => {
  const navigate = useRouter()
  const {user} = useSelector((state) => state.user);
  
  useEffect(() => {
    setTimeout(() => {
      navigate.replace('/')
    }, 2000)
  }, [])
  return (
    <div className='WelcomeContainer'>
        <div className="welocmeImg">
        <Image src={WelcomeLogo} alt="welcome Logo" className="welcomeLogo" />
        </div>
        <p>Welcome {user?.name ? user.name : "name"}, You are all Done.</p>
        <div className="welcomeBtnCont"><button className="welcomeBtn" type='submit'>Homepage</button></div> 
    </div>
  )
}

export default Welcome;
