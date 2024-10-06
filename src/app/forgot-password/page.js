"use client"
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forgotUser } from '../Store/UserSlice';
import { useRouter } from 'next/navigation';



const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const {error, loading} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [linkSent, setLinkSent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await dispatch(forgotUser(email));
            if(result.payload.status === "SUCCESS"){
                setLinkSent(true);
                setTimeout(() => {
                    navigate.replace("/login");
                }, 1500);
            }
        }catch(err){
            console.log(err.message);
        }
    }

    return (
    <div className='passwordContainer'>
          <h4 className="forgotHeading">
            Forgot Password
        </h4>
       
       {
        linkSent && (
            <p className='reset-message'>Reset ink has been sent to your email.</p>
        )
       }
        <form className="forgetFormContainer" onSubmit={handleSubmit}>
      

        <div className="inputContainer">
        <label htmlFor="username">email:</label>
        <input type="email" name="username" id="forgotEmail" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      {error && (
        <div className='login-error'>{error}</div>
      )}

      <button className="loginBtn" type='submit'>{loading ? "Loading..." : "SEND"}</button>
        </form>
    </div>
  )
}

export default ForgotPass;
