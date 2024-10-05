"use client"
import React, {useState, useEffect} from 'react';
import  Link  from 'next/link';
import { useDispatch } from 'react-redux';
import { googleLoginUser, loginuser } from '../Store/UserSlice';
import { useSelector } from 'react-redux';
import { useRouter, redirect } from 'next/navigation';
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading, user} = useSelector((state) => state.user)
  const navigate = useRouter();

  useEffect(() => {
   if(user !== null || undefined){
    redirect("/")
   }
  }, [user])
  
//<button className="socialButtons" onClick={login}><img src={Google} alt="Google Icon" className="socialBtn" /> Continue With Google</button>
  const handleLoginSubmit = async (e) => {
    try{
    e.preventDefault();
    let userCredentials = {
      email, password
    };
   const result = await dispatch(loginuser(userCredentials));
   if(result.payload.status === "SUCCESS"){
    setEmail("");
      setPassword("");
    localStorage.setItem("user", JSON.stringify(result.payload.data));
    navigate.replace("/");
   }
  }catch(err){
    console.log(err.message);
  }
  
  }

  return (
    <div className='loginContainer'>
      <div className="socialLogin">
      <GoogleLogin 
      
  onSuccess={async (credentialResponse) => {
    let credentials = {credential: credentialResponse.credential, client_id: credentialResponse.clientId};
   try{
    const result = await dispatch(googleLoginUser(credentials));
    if(result.payload.status === "SUCCESS"){
      localStorage.setItem("user", JSON.stringify(result.payload.data));
      navigate.replace("/");
     }
   }catch(err){
    console.log(err.message);
   }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
      </div>

      <form className="loginFormContainer" onSubmit={handleLoginSubmit}>
        <div className="inputContainer">
        <label htmlFor="username">email:</label>
        <input type="email" name="username" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      
      <div className="inputContainer">
      <label htmlFor="password">password:</label>
      <input type="password" name="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
    
      {error && (
        <div className='login-error'>{error}</div>
      )}
      <Link href="/forgot-password" className="loginForgotBtn">Forgot Password</Link>
      <button className="loginBtn" type='submit'>{loading ? "Loading..." : "Login"}</button>
      </form>
      <Link href="/signup" className="loginBackBtn">Don't have an account, Sign Up.</Link>
    </div>
  )
}

export default Login;
