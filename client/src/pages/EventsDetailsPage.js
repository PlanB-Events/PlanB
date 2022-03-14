import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import eventsService from "../services/events"

export default function EventsDetailsPage(){

    const {id} = useParams("id")
    const [currentEvent, setCurrentEvent] = useState({})

    const {_id, title, imageUrl, category, description, duration, time, date, location } = currentEvent

    useEffect(()=>{
        eventsService
        .getEvent(id)
        .then((foundEvent)=>{setCurrentEvent(foundEvent)})
    }, [id])

    return(
        <div>
            <h3>{title}</h3>

            <div key={_id} className="eventDetails">
                <img src={imageUrl} alt="eventImg" />
                <h3>{category}</h3>
                <h3>{date}</h3>
                <h3>{time}</h3>
                <h3>{duration}</h3>
                <h3>{description}</h3>
                <h2>{location}</h2>
            </div>
       </div>
    )
}