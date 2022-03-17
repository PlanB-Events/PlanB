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
           
            <div>
            <button type="button" className="btn btn-dark btn-rounded" data-mdb-ripple-color="dark" onClick={()=>{if(loginTab){toggleTab()}}}> Signup </button> 
            <button  type="button" className="btn btn-dark btn-rounded" data-mdb-ripple-color="dark" onClick={()=>{if(signupTab){toggleTab()}}}> Login </button> 
            {loginTab && <LoginCard />}
            {signupTab && <SignupCard toggleTab={toggleTab}/>}
          </div>
        </div>
      </div>
    )
}