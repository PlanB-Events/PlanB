import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import cloudinaryService from "../services/cloudinary";
import userService from "../services/users";



export default function EditProfile(){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const {id} = useParams("id")

    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        username:"",
    })

    const handleFileUpload = (event) => {
  
        const uploadData = new FormData();
  
        uploadData.append("imageUrl", event.target.files[0]);
    
        cloudinaryService.uploadImage(uploadData)
        .then(response => {
          setImageUrl(response.fileUrl);
          setFormData(formData =>({...formData,[event.target.name]: response.fileUrl }));
        })
        .catch(err => console.log("Error while uploading the file: ", err));
      };

      function handleSubmit(event){
        event.preventDefault();
        
        userService.editUser(id, formData)
        .then((__)=>{
            console.log(formData);
            navigate("/");
          })
        .catch(err => console.log("Error while creating the event: ", err));
      }

      function handleChange(event){
        const key = event.target.name;
        const value = event.target.value;
        setFormData(formData =>({...formData,[key]: value }));
    }


    return(
        <div className="createEventCard">
        <h3>Edit your profile</h3>
            <form onSubmit={handleSubmit}>

            <label>Name:</label>
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />

            <label>Image:</label>
            <img width={400} src={imageUrl} alt="img-previsualization"/>
            <input name="imageUrl" type="file" onChange={(event) => {handleFileUpload(event)}} />

            <button type="submit">Submit</button>
            </form>

        </div>
    )
}