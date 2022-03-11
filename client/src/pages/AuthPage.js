import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";

export default function AuthPage(){

    

    return(
        <div>

            <button> Signup </button> <SignupCard />
            <button> Login </button> <LoginCard />

        </div>
    )
}