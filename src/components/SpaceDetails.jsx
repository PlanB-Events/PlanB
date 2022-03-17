import { useEffect, useState } from "react";
import spacesService from "../services/spaces";
import petsTrueLogo from "../assets/pet.svg";
import beveragesTrueLogo from "../assets/byob.svg";
import covidTrueLogo from "../assets/virus-test-tube-icon-black-green.svg";
import wheelchairTrueLogo from "../assets/wheelchair.svg";
import LoadingComponent from "./Loading";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

export default function SpaceDetails(props) {
  const [currentSpace, setCurrentSpace] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    spacesService.getSpace(props.spaceId).then((space) => {
      setCurrentSpace(space);
    });
  }, [props.spaceId]);

  function deleteSpace() {
    spacesService
      .deleteSpace(currentSpace._id, currentSpace.owner)
      .then((_) => {
        navigate(`/profile/${currentSpace.owner}`);
      });
  }

  return currentSpace._id ? (
    <div>
      <div className="card-body">
        <img
          className="card-img-top"
          src={currentSpace.imageUrl}
          alt="Space_Img"
        />

        <div className="card-body">
          <h1 className="card-title">{currentSpace.name}</h1>
          <p className="card-text">{currentSpace.description}</p>
          <h4 className="card-text">Available Hours:</h4>
          <p className="card-text">
            {currentSpace.availableHours.map((hour) => {
              return <p key={hour}>{hour}</p>;
            })}
          </p>
          <h4 className="card-text">Available Date:</h4>

          <p className="card-text">
            {" "}
            {currentSpace.availableDates[0].slice(0, 10)}
          </p>

          <h4 className="card-text">Capacity:</h4>
          <p className="card-text">{currentSpace.capacity} people</p>

          <h4 className="card-text">Address:</h4>
          <p className="card-text">{currentSpace.address.direction}</p>

          {currentSpace.allowedPets && (
            <img className="logoSpace" src={petsTrueLogo} alt="features" />
          )}
          {currentSpace.allowedBeverages && (
            <img className="logoSpace" src={beveragesTrueLogo} alt="features" />
          )}
          {currentSpace.covidTest && <img className="logoSpace" src={covidTrueLogo} alt="features" />}
          
          {currentSpace.wheelchairAccess && (
            <img className="logoSpace" src={wheelchairTrueLogo} alt="features" />
          )}

          <div>
            <button
              className="btn btn-dark btn-rounded spaceButton"
              data-mdb-ripple-color="dark"
              onClick={deleteSpace}
            >
              Delete space
            </button>
            <div>
            <GoBackButton />

            </div>

          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
}
