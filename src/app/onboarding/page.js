"use client"
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Cavemen from "../Images/cavemen.png";
import Saro from "../Images/saro.png";
import Element from "../Images/element.png";
import SVG from "../Images/svg.svg";
import  Link  from 'next/link';

export const runtime = "edge";
const Home = () => {
  useEffect(() => {
    if(user !== null || undefined){
     redirect("/")
    }
   }, [user])
  return (
    <div className='onboardingContainer'>
      <p className='intro-text'>WHAT'S HAPPENING TODAY</p>
    
    <div className='onboardingImages'>
      <div className='onboardImg onboardImg1'>
      <Image src={Saro} alt="Saro" className="saro" />
      </div>
      <div className="onboardImg onboardImg2">
      <Image src={Cavemen} alt="Cavemen" className="cavemen" />
      </div>
      <div className="onboardImg onboardImg3">
      <Image src={Element} alt="Element" className="element" />
      </div>
     </div>

     <p className='registerP'><Link href="/signup" className="registerText">New Here? Register</Link></p>
    <Image src={SVG} alt="svg" className="svg" />
    <p><Link href="/login" className='onboardingLogin'>LOGIN</Link></p>
    </div>
  )
}

export default Home;
