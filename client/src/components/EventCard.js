import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import userService from "../services/users";
import { AuthContext } from "../context/auth.context";
import LoadingComponent from "../components/Loading";

export default function EventCard(props) {
  const { _id, title, imageUrl, category, date, location } = props.event;
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    if (user._id) {
      userService.getUser(user._id).then((foundUser) => {
        setCurrentUser(foundUser);
      });
    }
  }, [user._id, isRun]);

  function handleJoinEvent(event) {
    userService.joinEvent(currentUser._id, _id).then((updatedUser) => {
      setIsRun(!isRun);
      setCurrentUser(updatedUser);
    });
  }

  function handleLeaveEvent(event) {
    userService.leaveEvent(currentUser._id, _id).then((updatedUser) => {
      setIsRun(!isRun);
      setCurrentUser(updatedUser);
    });
  }
  return (
    <div  className="card-body ">
      <div key={_id}>
        <img className="card-img-top" src={imageUrl} alt="eventImg" />

        <div className="card-body">
          <Link to={`/events/${_id}`}>
            <h3 className="card-title">{title}</h3>
          </Link>

          <h3 className="card-text">{category}</h3>
          <h3 className="card-text">{date.toString().slice(0, 10)}</h3>
          <h2 className="card-text">{location}</h2>
          {currentUser._id ? (
            currentUser.joinedEvents.some(
              (joinedEvent) => joinedEvent._id === _id
            ) ? (
              <button
                type="button"
                class="btn btn-outline-info btn-rounded"
                data-mdb-ripple-color="dark"
                onClick={handleLeaveEvent}
              >
                Leave the event
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-outline-info btn-rounded"
                data-mdb-ripple-color="dark"
                onClick={handleJoinEvent}
              >
                Join this event!
              </button>
            )
          ) : (
            <p>Log in to join this event!</p>
          )}
        </div>
      </div>
    </div>
  );
}
