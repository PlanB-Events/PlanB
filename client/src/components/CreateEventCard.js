import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsService from "../services/events";


export default function CreateEventCard(){
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        date: ""
    });

    function handleSubmit(event){
        event.preventDefault();

        eventsService
        .createEvent(formData)
        .then((__)=>{
            navigate("/events")})
        .catch(err => console.log("Error while creating the event: ", err));
    }

    function handleChange(event){
        const key = event.target.name 
        const value = event.target.value
        setFormData(formData =>({...formData,[key]: value }))
    }

    return(
        <div className="createEventCard">
        <h3>Create a new event</h3>
        <h3>Welcome back, we missed you</h3>

        <form onSubmit={handleSubmit}>
      
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        </form>
      </div>
    )
}