import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsService from "../services/events";
import spacesService from "../services/spaces";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";

export default function CreateEventCard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allSpaces, setAllSpaces] = useState([]);

  useEffect(() => {
    spacesService.getAllSpaces().then((spaces) => {
      setAllSpaces(spaces);
    });
  }, []);

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
    space: null,
  });

  const handleFileUpload = (event) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", event.target.files[0]);

    cloudinaryService
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
        setFormData((formData) => ({
          ...formData,
          [event.target.name]: response.fileUrl,
        }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  function handleSubmit(event) {
    event.preventDefault();

    eventsService
      .createEvent(formData)
      .then((__) => {
        console.log(formData);
        navigate("/events");
      })
      .catch((err) => console.log("Error while creating the event: ", err));
  }

  function handleChange(event) {
    const key = event.target.name;
    const value =
      key === "space"
        ? event.target.options[event.target.selectedIndex].value
        : event.target.value;
    setFormData((formData) => ({ ...formData, [key]: value }));
  }

  function getSelectValues(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  return (
    <div className="createEventCard">
      <h3>Create a new event</h3>
      <h2>Join a community run by artists for artists.</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
        <label className="form-label"> Type of Event:</label>
        <select
          className="form-select form-select-sm"
          name="category"
          onChange={getSelectValues}
          required
        >
          <option style={{ display: "none" }} selected disabled value="">
            Select Category
          </option>
          <option value="Concert">Concert</option>
          <option value="Sport">Sport</option>
          <option value="Cooking">Cooking</option>
          <option value="Cultural">Cultural</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>
        </div>


        <div className="mb-3">
        <label className="form-label">Image:</label>
        <img width={400} src={imageUrl} alt="img-previsualization" />
        <input
          className="form-control"
          id="formFile"
          name="imageUrl"
          type="file"
          onChange={(event) => {
            handleFileUpload(event);
          }}
        />
        </div>


        <div className="mb-3">
        <label className="form-label"> Date:</label>
        <input
          type="date"
          name="date"
          min={new Date().toISOString().slice(0, 10)}
          value={formData.date}
          onChange={handleChange}
          className="form-control"
        />
        </div>


        <div className="mb-3">
        <label className="form-label">Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="form-control"
        />      
        </div>

        <div className="mb-3">
        <label className="form-label">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
        </div>

        <div className="mb-3">
        <label className="form-label">Duration:</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="form-control"
        />
        </div>
        

        <div className="mb-3">
        <label className="form-label">Space:</label>
        <select className="form-select form-select-sm" name="space" onChange={handleChange} required>
          <option style={{ display: "none" }} selected disabled value="">
            Select a Space
          </option>
          {allSpaces.map((space) => {
            return (
              <option key={space._id} value={space._id}>
                {space.name}
              </option>
            );
          })}
        </select>
        </div>

        <button
          className="btn btn-outline-info btn-rounded"
          data-mdb-ripple-color="dark"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
