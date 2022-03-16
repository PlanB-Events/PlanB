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
        <div className="formContainer editProfileCard">
        <h3>Edit your profile</h3>

          <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image:</label>
            <img className="form-control"
            id="formFile" width={400} src={imageUrl} alt=""/>
            <input className="form-control"
          id="formFile" name="imageUrl" type="file" onChange={(event) => {handleFileUpload(event)}} />
          </div>



            <button className="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Submit</button>
            </form>

        </div>
    )
}