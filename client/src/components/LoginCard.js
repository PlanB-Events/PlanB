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
        <h4>Welcome back, we missed you</h4>

        <form onSubmit={handleSubmit}>
            <div className="form-row">
              
              <div className="form-group col-md-6">
                <label for="inputEmail4">Email:</label>
                <input type="email" 
                    className="form-control" 
                    id="inputEmail4" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"/>
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Password:</label>
                <input type="password" 
                    className="form-control" 
                    id="inputPassword4" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"/>
              </div>
            </div>
         
        <button className="btn btn-dark btn-rounded" data-mdb-ripple-color="dark" type="submit">Submit</button>
        </form>
      </div>
    )
}