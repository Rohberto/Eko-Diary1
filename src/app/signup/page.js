"use client"
import React, {useState, useEffect} from 'react';
import  Link  from 'next/link';
import { useDispatch } from 'react-redux';
import { googleLoginUser, signUser } from '../Store/UserSlice';
import { useSelector } from 'react-redux';
import { useRouter, redirect } from 'next/navigation';
import {GoogleLogin} from "@react-oauth/google";


const SignUp = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const {user, error, loading} = useSelector((state) => state.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(user !== null || undefined){
     redirect("/")
    }
   }, [user])

  const handleSignUp = async (e) => {
      e.preventDefault();
      try{
        let userCredentials = {
  name, email, password
        }
        const result = await dispatch(signUser(userCredentials));
       if(result.payload.status === "PENDING"){
        setEmail("");
        setName("");
        setPassword("");
        navigate.replace("/otp");
       }

      }catch (err){
        console.log(err.message);
      }
  }
  return (
    <div className='signupContainer'>
      <div className="socialLogin">
      <GoogleLogin 
      
  onSuccess={async (credentialResponse) => {
    let credentials = {credential: credentialResponse.credential, client_id: credentialResponse.clientId};
   try{
    const result = await dispatch(googleLoginUser(credentials));
    console.log(result);
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

      <form className="loginFormContainer" onSubmit={handleSignUp}>
        <div className="inputContainer">
        <label htmlFor="username">username:</label>
        <input type="text" name="username" id="signup-name" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="inputContainer">
        <label htmlFor="email">email:</label>
        <input type="email" name="email" id="signup-email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      
      <div className="inputContainer">
      <label htmlFor="password">password:</label>
      <input type="password" name="password" id="signup-password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      {error && (
        <div className='login-error'>{error}</div>
      )}
      <button className="loginBtn" type='submit'>{loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <Link href="/login" className="loginBackBtn">Already have an account? Login.</Link>
    </div>
  )
}

export default SignUp;
