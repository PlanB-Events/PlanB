import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import eventsService from "../services/events";
import LoadingComponent from "../components/Loading";
import {AuthContext} from "../context/auth.context";
import userService from "../services/users";

export default function EventsDetailsPage() {
    const { id } = useParams("id");
    const [currentEvent, setCurrentEvent] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const { user } = useContext(AuthContext);
    const [search] = useSearchParams();
    const backpage = search.get("b");
    const [isRun, setIsRun] = useState(false);
    const navigate= useNavigate();

    const {_id, title, imageUrl, category, description, duration, time, date, space } = currentEvent;

    useEffect(()=>{
    if(user._id){
        userService.getUser(user._id)
        .then((foundUser)=>{setCurrentUser(foundUser)})}
    }, [user._id])

    useEffect(() => {
        eventsService.getEvent(id).then((foundEvent) => {
        setCurrentEvent(foundEvent);
        });
    }, [id]);

    function deleteEvent(eventId, userId){
        eventsService.deleteEvent(eventId, userId)
        .then((_)=>{
          setIsRun(!isRun);
          navigate(`profile/${currentUser._id}`)
        })
    }

    function handleJoinEvent(event){
        userService.joinEvent(currentUser._id, _id)
        .then((updatedUser)=>{
            setIsRun(!isRun)
            setCurrentUser(updatedUser)})
    }

    function handleLeaveEvent(event){
        userService.leaveEvent(currentUser._id, _id)
        .then((updatedUser)=>{
            setIsRun(!isRun)
            setCurrentUser(updatedUser)})
     }


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

            {currentUser._id ?
                currentUser.createdEvents.some((createdEvent)=> createdEvent._id === _id)
                ?
                <button className="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" onClick={()=>deleteEvent(_id, currentUser._id)}>Delete</button>
                :
                currentUser.joinedEvents
                .some((joinedEvent)=> joinedEvent._id === _id)
                ?
                <button type="button" className="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" onClick={handleLeaveEvent}>Leave the event</button>
                :
                <button type="button" className="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" onClick={handleJoinEvent}>Join this event!</button>
            :
            <p>Log in to join this event!</p>
            }


            {backpage && <Link to={`${backpage}`}>Go back to map</Link>}
            </div>
        </div>
        </div>
      </div>
  ) : (
    <LoadingComponent />
  );
}
