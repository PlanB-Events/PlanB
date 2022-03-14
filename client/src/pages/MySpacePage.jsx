import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import spacesService from "../services/spaces";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";

export default function MySpace(){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");

    const [formData, setFormData] = useState({
        id: user._id,
        name: "", 
        availableDates: [],
        availableHours: [],
        capacity: 2,  
        address: {
            street:"",
            stNumber: "",
            postcode: 1000
        }, 
        allowedPets: false, 
        allowedBeverages: false,
        covidTest: false,
        wheelchairAccess: false
    })

    const handleFileUpload = (event) =>{

      const uploadData = new FormData();

      uploadData.append("imageUrl", event.target.files[0]);

      cloudinaryService.uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
        setFormData(formData =>({...formData,[event.target.name]: response.fileUrl }));
      })
      .catch(err => console.log("Error while uploading the file: ", err));

    }

    function handleSubmit(event){
        event.preventDefault();
      
        spacesService.createSpace(formData)
        .then((__)=>{
          console.log(formData);
          navigate("/");
        })
      .catch(err => console.log("Error while creating the space: ", err));
    }

    function handleChange(event){
        const name = event.target.name
        const value = event.target.value
        setFormData(formData=>({...formData, [name]:value}))
    }

    function getSelectValues(event) {
        const name = event.target.name;
        const result = [];
        const options = event && event.target.options;
        let opt;
      
        for (var i=0; i<options.length; i++) {
          opt = options[i];
      
          if (opt.selected) {
            result.push(opt.value);
          }
        }
        setFormData(formData=>({...formData, [name]:result}));
    }

    return(
        <div className="createEventCard"v>
            <h3>Create a space</h3>

            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                
                <label>Image:</label>
                 <img width={400} src={imageUrl} alt="img-previsualization"/>
                 <input name="imageUrl" type="file" onChange={(event) => {handleFileUpload(event)}} />

                <label>Available Dates:</label>
                <input
                    type="date"
                    name="availableDates"
                    value={formData.availableDates}
                    onChange={handleChange}
                />

                <label>Available hours:</label>
                <select name="availableHours" onChange={getSelectValues} multiple>
                    <option value="08:00-12:00h">08:00-12:00h</option>
                    <option value="12:00-18:00h">12:00-18:00h</option>
                    <option value="18:00-00:00h">18:00-00:00h</option>
                </select>

                <label>Capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                />

                <p>Address:</p>
                <label>Street:</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    name="stNumber"
                    value={formData.stNumber}
                    onChange={handleChange}
                />
                <label>Postcode:</label>
                <input
                    type="number"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                />

                <label>Allowed pets:</label>
                <select onChange={handleChange} name="allowedPets">
                    <option value={!formData.allowedPets}>Yes</option>
                    <option value={formData.allowedPets}>No</option>
                </select>

                <label>Allowed beverages:</label>
                <select onChange={handleChange} name="allowedBeverages">
                    <option value={!formData.allowedBeverages}>Yes</option>
                    <option value={formData.allowedBeverages}>No</option>
                </select>
               
                <label>Covid Test:</label>
                <select onChange={handleChange} name="covidTest">
                    <option value={!formData.covidTest}>Yes</option>
                    <option value={formData.covidTest}>No</option>
                </select>

                <label>Wheelchair access:</label>
                <select onChange={handleChange} name="wheelchairAccess">
                    <option value={!formData.wheelchairAccess}>Yes</option>
                    <option value={formData.wheelchairAccess}>No</option>
                </select>
                
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}