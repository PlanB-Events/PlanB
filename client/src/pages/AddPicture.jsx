// pages/AddMovie/AddMovie.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import the service file since we need it to send/get the data to/from the server
import cloudinaryService from "../services/cloudinary";

function UploadPic (){
  const [imageUrl, setImageUrl] = useState("");

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    cloudinaryService
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
    <div>
      <h2>New Movie</h2>
      <img src={imageUrl} />
        <input type="file" onChange={(e) => handleFileUpload(e)} />

    </div>
  );
}

export default UploadPic;