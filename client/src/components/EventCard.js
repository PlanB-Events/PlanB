import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react"
import userService from "../services/users";
import {AuthContext} from "../context/auth.context"
import LoadingComponent from "../components/Loading"

export default function EventCard(props){
    
    const { _id, title, imageUrl, category, date, location } = props.event;
    const {user} = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [isRun, setIsRun] = useState(false);


    useEffect(()=>{
        userService.getUser(user._id)
        .then((foundUser)=>{setCurrentUser(foundUser)})
    }, [isRun])

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
    return(currentUser._id ?
        <div>
            <Link to={`/events/${_id}`}>
            <h3>{title}</h3>
            </Link>

            <div key={_id} className="eventCard">
                <img width={400} src={imageUrl} alt="eventImg" />
                <h3>{category}</h3>
                <h3>{date}</h3>
                <h2>{location}</h2>
                {currentUser.joinedEvents
                .some((joinedEvent)=> joinedEvent._id === _id)
                ?
                <button onClick={handleLeaveEvent}>Leave the event</button>
                :
                <button onClick={handleJoinEvent}>Join this event!</button>
                }
            </div>
       </div>
       :
       <LoadingComponent/>
    )
}