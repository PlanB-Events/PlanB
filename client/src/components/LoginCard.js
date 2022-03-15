import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function LoginCard(){
    

  const {logInUser} = useContext(AuthContext)
    const navigate= useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleSubmit(event){
        event.preventDefault();
        logInUser(formData);
        navigate("/");
    }

    function handleChange(event){
        const key = event.target.name 
        const value = event.target.value
        setFormData(formData =>({...formData,[key]: value }))
    }

    return(
        <div className="SignupCard">
        <h3>Login</h3>
        <h3>Welcome back, we missed you</h3>

        <form onSubmit={handleSubmit}>
      
        <label>Email:</label>
        <textarea
          type="text"
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

        <button class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Submit</button>
        </form>
      </div>
    )
}