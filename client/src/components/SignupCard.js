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
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputUsername">Username:</label>
                <input type="text" 
                    class="form-control" 
                    id="inputUsername"
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Username"/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email:</label>
                <input type="email" 
                    class="form-control" 
                    id="inputEmail4" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Password:</label>
                <input type="password" 
                    class="form-control" 
                    id="inputPassword4" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"/>
              </div>
            </div>
         

            <button type="submit" class="btn btn-primary">Sign in</button>
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

        <button class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Submit</button>
        </form>
     </div>  
    )
}