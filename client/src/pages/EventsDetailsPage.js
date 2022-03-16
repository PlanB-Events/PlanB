import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import eventsService from "../services/events";
import LoadingComponent from "../components/Loading";

export default function EventsDetailsPage(){

    const {id} = useParams("id");
    const [currentEvent, setCurrentEvent] = useState({});

    const [search] = useSearchParams();
    const backpage = search.get("b");

    const {_id, title, imageUrl, category, description, duration, time, date, space } = currentEvent;

    useEffect(()=>{
        eventsService
        .getEvent(id)
        .then((foundEvent)=>{
            setCurrentEvent(foundEvent)})
    }, [id])

    return(_id ?
        <div>
            <h3>{title}</h3>

            <div key={_id} className="eventDetails">
                <img width={400} src={imageUrl} alt="eventImg" />
                <h3>{category}</h3>
                <h3>{date}</h3>
                <h3>{time}</h3>
                <h3>{duration}</h3>
                <h3>{description}</h3>
                <h2>Space: {space.name}</h2>
                {backpage && <Link to={`${backpage}`}>Go back to map</Link>}
            </div>
       </div>
       :
       <LoadingComponent />
    )
}