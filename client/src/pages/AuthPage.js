import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import {useState} from "react";

export default function AuthPage(){

    const [loginTab, setLoginTab] = useState(true)
    const [signupTab, setSignupTab] = useState(false)

    function toggleTab(){
        setLoginTab(!loginTab)
        setSignupTab(!signupTab)
    }

    return(
        <div className="authContainer">
         <div className="formContainer">
           
            <div className="btn-container">
            <button onClick={()=>{if(loginTab){toggleTab()}}}> Signup </button> 
            <button  onClick={()=>{if(signupTab){toggleTab()}}}> Login </button> 
            </div>
           
            {loginTab && <LoginCard />}
            {signupTab && <SignupCard toggleTab={toggleTab}/>}
          </div>
        </div>
    )
}