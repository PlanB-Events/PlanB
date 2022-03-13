import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsService from "../services/events";


export default function EventsDetailsPage(props){

    const [eventsData, setEventsData] = useState([]);
    const params = useParams(); 

    const {event: { id, title, imageUrl, category, date, time, duration, description, location }} = props;

    return(
        <div>
            <h3>{eventsData.title}</h3>

            <div key={eventsData._id} className="eventCard">
                <img src={eventsData.imageUrl} alt="eventImg" />
                <h3>{eventsData.category}</h3>
                <h3>{eventsData.date}</h3>
                <h3>{eventsData.time}</h3>
                <h3>{eventsData.duration}</h3>
                <h3>{eventsData.description}</h3>
                <h2>{eventsData.location}</h2>
            </div>
       </div>
    )
}