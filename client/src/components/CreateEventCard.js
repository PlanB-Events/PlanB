import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsService from "../services/events";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";


export default function CreateEventCard(){
    
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");

    const [formData, setFormData] = useState({
      id: user._id,
      title: "",
      category: "",
      imageUrl: "",
      date: "",
      time: "",
      description: "",
      duration: 1,
      location: null
    });

    const handleFileUpload = (event) => {
  
      const uploadData = new FormData();

      uploadData.append("imageUrl", event.target.files[0]);
  
      cloudinaryService.uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
        setFormData(formData =>({...formData, [event.target.name]: response.fileUrl }));
      })
      .catch(err => console.log("Error while uploading the file: ", err));
    };

    function handleSubmit(event){
      event.preventDefault();
      
      eventsService.createEvent(formData)
      .then((__)=>{
          console.log(formData);
          navigate("/events");
        })
      .catch(err => console.log("Error while creating the event: ", err));
    }

    function handleChange(event){
        const key = event.target.name;
        const value = event.target.value;
        setFormData(formData =>({...formData,[key]: value }));
    }

    function getSelectValues(event) {
      const name = event.target.name;
      const value = event.target.value;

      setFormData(formData=>({...formData, [name]:value}));
  }

    return(
        <div className="createEventCard">
        <h3>Create a new event</h3>
        <h2>Join a community run by artists for artists.</h2>

        <form onSubmit={handleSubmit}>
      
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label> Type of Event:</label>
        <select name="category" onChange={getSelectValues}>
          <option value="Concert">Concert</option>
          <option value="Sport">Sport</option>
          <option value="Cooking">Cooking</option>
          <option value="Cultural">Cultural</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>

        <label>Image:</label>
        <img width={400} src={imageUrl} alt="img-previsualization"/>
        <input name="imageUrl" type="file" onChange={(event) => {handleFileUpload(event)}} />


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

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Duration:</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        
        {/* Map sobre los spaces creados
        <label>Location:</label>
        <input
          type="number"
          name="location"
          value={formData.location}
          onChange={handleChange}
        /> */}

        <button type="submit">Submit</button>
        </form>
      </div>
    )
}