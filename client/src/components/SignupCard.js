import { useState } from "react";
import axios from "axios";

export default function SignupCard(){
    const API_URL = "http://localhost:5005";

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleSubmit(event){
        event.preventDefault();

        axios
        .post(`${API_URL}/api/user`, formData)
        .then((__) =>{
            setFormData({
                username: "",
                email: "",
                password: ""
            })
        })
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
        name="title" 
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
        <textarea
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        </form>
      </div>
    )
}