import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsService from "../services/events";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";


export default function CreateEventCard(){
    
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
    
        const uploadData = new FormData();
    
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
    
        cloudinaryService
          .uploadImage(uploadData)
          .then(response => {
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    const [formData, setFormData] = useState({
        id: user._id,
        title: "",
        category: "",
        imageUrl: imageUrl,
        date: "",
        time: "",
        duration: 1,
        location: null
    });


    function handleSubmit(event){
        event.preventDefault();
        
        eventsService
        .createEvent(formData)
        .then((__)=>{
            console.log(formData)})
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

        <label> Type of Event:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Image:</label>
        <img src={imageUrl} 
        alt="img-previsualization"/>
        <input type="file" onChange={(e) => handleFileUpload(e)} />


        <label> Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <label>Duration:</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        </form>
      </div>
    )
}