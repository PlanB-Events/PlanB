import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, navigate, useNavigate } from "react-router-dom";
import eventsService from "../services/events";
import EventCard from "../components/EventCard";
import LoadingComponent from "../components/Loading";
import FilterButton from "../components/FilterButton";
// import eventsService from "../services/events";

export default function EventsListPage(props){

    const [eventsData, setEventsData] = useState([]);
    const {category}= useParams("category");
    const [eventsIsRun, setEventsIsRun] = useState(false);

    useEffect(()=>{
        eventsService.getSelectedEvents(category)
        .then((selectedEvents)=>{
            console.log("SELECTEDEVENETS",selectedEvents)
            setEventsData(selectedEvents)})
    }, [category, eventsIsRun])


    return(
        <div>        
            {eventsData.length ?
            <div className="card align-items-center">
                {eventsData.map((event) => (
                    <div style={{ maxWidth: "400px" }} key={event._id} className="card">
                        <EventCard eventsIsRun={eventsIsRun} setEventsIsRun={setEventsIsRun} event = {event}/>
                    </div>
                ))}
            </div>
            :
            <p>No events found</p>
            }
        </div>
    )
}