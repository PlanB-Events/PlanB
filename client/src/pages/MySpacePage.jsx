import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import spacesService from "../services/spaces";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function MySpace(){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");

    const [addressText, setAddressText] = useState("");
    const [apiAddress, setApiAddress] = useState("");
    const [addressLng, setAddressLng] = useState(0);
    const [addressLat, setAddressLat] = useState(0);

    const [formData, setFormData] = useState({
        id: user._id,
        name: "", 
        availableDates: [],
        availableHours: [],
        capacity: 2,  
        address: {
            direction: apiAddress,
            coordinates: [addressLng, addressLat]
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

    function handleDirectionChange(event){
        const name = event.target.name;
        setAddressText(event.target.value);
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressText}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`)
        .then((response)=>{
            setAddressLng(response.data.features[0].center[0])
            setAddressLat(response.data.features[0].center[1])
            setApiAddress(response.data.features[0].place_name)
            setFormData({...formData, [name]:{
                direction: response.data.features[0].place_name,
                coordinates: [response.data.features[0].center[0], response.data.features[0].center[1]]
            }})
        })
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
                    min={new Date().toISOString().slice(0, 10)}
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

                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={addressText}
                    onChange={handleDirectionChange}
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
                
            <button class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Submit</button>
            </form>
        </div>
    )
}