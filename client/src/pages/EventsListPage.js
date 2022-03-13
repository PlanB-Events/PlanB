import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, navigate, useNavigate } from "react-router-dom";
// import eventsService from "../services/events";

export default function EventsListPage(props){

    const [eventsData, setEventsData] = useState([]);
    const params = useParams(); 

    const {
        event: { _id, title, imageUrl, typeOfEvent, date },
      } = props;

    return(
        <div>
            <div className="filter-btn">
            <button>Choose a date button</button>
            </div>
        
        <div>
            {eventsData.map((event) => (
                <div style={{ maxWidth: "400px" }} key={event._id} className="card">
                <img src={event.imageUrl} alt="eventImg" />
                <Link to={`/events/${event._id}`}>
                    <h1>{event.title}</h1>
                </Link>
                <h3>{event.typeOfEvent}</h3>
                <h2>{event.date}</h2>
                </div>
                ))}
          </div>
        </div>
    )
}