"use client"
import React from "react";
import Image from "next/image";
import Logo from "../Images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import  Link  from "next/link";
import { loggedOut } from "../Store/UserSlice";

const Header = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className='HeaderContainer'>
      <div className="headerLogo">
        <h1>EKO DIARY</h1>
      </div>

    <ul className="header_links">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/create-event">Create Events</Link></li>
      <li><Link href="about">About</Link></li>
      {
     !user ? ( <li><Link href="/login">Login</Link></li>) : (<li onClick={() => {
      localStorage.removeItem("user");
      dispatch(loggedOut());
     }}><a href="#">Logout</a></li>)
}
    </ul>

<div className="mobile_menu">
<div className="hamburger" onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
      </div>

      <div className="mobile_menu_content">

        <ul className="mobile_header_links">
        {user && (<p>Hi, {user.name}</p>)}
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link href="/">Home</Link></li>
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link href="/create-event">Create Events</Link></li>
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link href="about">About</Link></li>
      {
     !user ? ( <li onClick={() => {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".mobile_menu_content");
    
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }}><Link href="/login">Login</Link></li>) :  ( <li onClick={() => {
      localStorage.removeItem("user");
      dispatch(loggedOut());
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".mobile_menu_content");
    
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }}><a href="#">Logout</a></li>)
}
    </ul>
      </div>
</div>
     
<div className="headerIcon">
        <Image src={Logo} alt="Logo Icon" />
      </div>
    </div>
  )
}

export default Header