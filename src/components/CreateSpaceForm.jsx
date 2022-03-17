import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import spacesService from "../services/spaces";
import cloudinaryService from "../services/cloudinary";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import GoBackButton from "./GoBackButton";

export default function CreateSpaceForm() {
  const { user } = useContext(AuthContext);
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
      coordinates: [addressLng, addressLat],
    },
    allowedPets: false,
    allowedBeverages: false,
    covidTest: false,
    wheelchairAccess: false,
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

    spacesService
      .createSpace(formData)
      .then((__) => {
        console.log(formData);
        navigate("/");
      })
      .catch((err) => console.log("Error while creating the space: ", err));
  }

  function handleChange(event) {
    const name = event.target.name;
    const value =
      name === "allowedPets" ||
      name === "allowedBeverages" ||
      name === "covidTest" ||
      name === "wheelchairAccess"
        ? event.target.options[event.target.selectedIndex].value
        : event.target.value;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  function getSelectValues(event) {
    const name = event.target.name;
    const result = [];
    const options = event && event.target.options;
    let opt;

    for (var i = 0; i < options.length; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value);
      }
    }
    setFormData((formData) => ({ ...formData, [name]: result }));
  }

  function handleDirectionChange(event) {
    const name = event.target.name;
    setAddressText(event.target.value);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressText}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`
      )
      .then((response) => {
        setAddressLng(response.data.features[0].center[0]);
        setAddressLat(response.data.features[0].center[1]);
        setApiAddress(response.data.features[0].place_name);
        setFormData({
          ...formData,
          [name]: {
            direction: response.data.features[0].place_name,
            coordinates: [
              response.data.features[0].center[0],
              response.data.features[0].center[1],
            ],
          },
        });
      });
  }

  return (
    <div className="formContainer" v>
      <h3>Create a space</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image:</label>
          <img
            className="form-control"
            id="formFile"
            width={400}
            src={imageUrl}
            alt=""
          />
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
          <label className="form-label">Available Dates:</label>
          <input
            type="date"
            name="availableDates"
            min={new Date().toISOString().slice(0, 10)}
            value={formData.availableDates}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Available hours:</label>
          <select
            className="form-select form-select-sm"
            name="availableHours"
            onChange={getSelectValues}
            multiple
          >
            <option value="08:00-12:00h">08:00-12:00h</option>
            <option value="12:00-18:00h">12:00-18:00h</option>
            <option value="18:00-00:00h">18:00-00:00h</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={addressText}
            onChange={handleDirectionChange}
            className="form-control"
          />
          <p className="addressApi">{apiAddress ? apiAddress : "Selected addres here"}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Allowed pets:</label>
          <select
            className="form-select form-select-sm"
            onChange={handleChange}
            name="allowedPets"
          >
            <option value={formData.allowedPets}>No</option>
            <option value={!formData.allowedPets}>Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Allowed beverages:</label>
          <select
            className="form-select form-select-sm"
            onChange={handleChange}
            name="allowedBeverages"
          >
            <option value={formData.allowedBeverages}>No</option>
            <option value={!formData.allowedBeverages}>Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Covid Test:</label>
          <select
            className="form-select form-select-sm"
            onChange={handleChange}
            name="covidTest"
          >
            <option value={formData.covidTest}>No</option>
            <option value={!formData.covidTest}>Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Wheelchair access:</label>
          <select
            className="form-select form-select-sm"
            onChange={handleChange}
            name="wheelchairAccess"
          >
            <option value={formData.wheelchairAccess}>No</option>
            <option value={!formData.wheelchairAccess}>Yes</option>
          </select>
        </div>

        <button
          className="btn btn-dark btn-rounded"
          data-mdb-ripple-color="dark"
          type="submit"
        >
          Submit
        </button>
        <GoBackButton />
      </form>
    </div>
  );
}
