import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventsService from "../services/events";
import LoadingComponent from "../components/Loading";

export default function EventsDetailsPage() {
  const { id } = useParams("id");
  const [currentEvent, setCurrentEvent] = useState({});

  const {
    _id,
    title,
    imageUrl,
    category,
    description,
    duration,
    time,
    date,
    space,
  } = currentEvent;

  useEffect(() => {
    eventsService.getEvent(id).then((foundEvent) => {
      setCurrentEvent(foundEvent);
    });
  }, [id]);

  return _id ? (
      <div className="card align-items-center">
        <div className="card " style={{ width: 400 }} key={_id}>
        <div className="card-body">
            <img className="card-img-top" src={imageUrl} alt="eventImg" />

            <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <h3 className="card-text">Category:</h3>
            <p className="card-text">{category}</p>
            <h3 className="card-text">Date:</h3>
            <p className="card-text">{date.toString().slice(0, 10)}</p>
            <h3 className="card-text">Hour:</h3>
            <p className="card-text">{time}</p>
            <h3 className="card-text">Duration:</h3>
            <p className="card-text">{duration}h</p>
            <h3 className="card-text">Description:</h3>
            <p className="card-text">{description}</p>
            <h3 className="card-text">Space:</h3>
            <p className="card-text">{space.name}</p>
            </div>
        </div>
        </div>
      </div>
  ) : (
    <LoadingComponent />
  );
}
