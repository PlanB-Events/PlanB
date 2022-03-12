import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

export default function MySpace(){
    const [formData, setFormData] = useState({
        name: "", 
        imageUrl: "",
        availableDates: "",
        capacity: "",  
        address: "", 
        allowedPets: "", 
        allowedBeverages: "",
        covidTest:"",
        wheelchairAccess:""
    })

    const handleSubmit = (event) =>{
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const requestBody = {}

        const storedToken = localStorage.getItem('authToken');
        
        axios.post(
            `${API_URL}/api/spaces/`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
    }

    return(
        <div>
            <h1>Create a space</h1>
            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e)=> getSystemErrorName(e.target.value)}
                />
                
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={title}
                    onChange={(e)=> getSystemErrorName(e.target.value)}
                />
                <label>Available Dates:</label>
                <input
                    type="date"
                    name="availableDates"
                    value={availableDates}
                    onChange={(e)=> getSystemErrorName(e.target.value)}
                />
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={title}
                    onChange={(e)=> getSystemErrorName(e.target.value)}
                />

            </form>
        </div>
    )
}