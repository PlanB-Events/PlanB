import { useState } from "react";
import cloudinaryService from "../services/cloudinary";

function UploadPic (){
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

  return (
    <div>
      <h2>New Movie</h2>
      <img src={imageUrl} alt="img-previsualization"/>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

    </div>
  );
}

export default UploadPic;