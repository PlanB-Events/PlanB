import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function SignupCard(props){

    const navigate= useNavigate();

    const {signUpUser} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleSubmit(event){
        event.preventDefault();
        signUpUser(formData);
        navigate("/");
    }

    function handleChange(event){
        const key = event.target.name 
        const value = event.target.value
        setFormData(formData =>({...formData,[key]: value }))
    }

    return(
        <div className="SignupCard">
        <h3>Sign up</h3>

        <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
        type="text" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} />

        <label>Email:</label>
        <textarea
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        </form>
      </div>
    )
}