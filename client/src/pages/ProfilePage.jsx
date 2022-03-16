import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../services/users";
import LoadingComponent from "../components/Loading";
import EditProfileCard from "../components/EditProfileCard";

export default function ProfilePage() {
  const { id } = useParams("id");
  const [currentUser, setCurrentUser] = useState({});
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    userService.getUser(id).then((foundUser) => {
      setCurrentUser(foundUser);
    });
  }, [id, isRun]);

  const [editTab, setEditTab] = useState(false);

  function toggleEdit() {
    setEditTab(!editTab);
  }

  function handleLeaveEvent(id) {
    userService.leaveEvent(currentUser._id, id).then((updatedUser) => {
      setIsRun(!isRun);
      setCurrentUser(updatedUser);
    });
  }

  return currentUser._id ? (
    <div className="containerDiv">
      <div className="profile-header">
        <h1>This is Profile page</h1>
     
      <img id="profileImg"
        src={currentUser.imageUrl}
        alt="profileimg"
        height="150px"
        width="150px"
      />
       </div>
      <div className="userData">
        <h4>Name:</h4>
        <p>{currentUser.username}</p>
        <h4>Email:</h4>
        <p>{currentUser.email}</p>
      </div>

      <div className="eventsData">
      <h4>Events joined:</h4>
      <ul>
        {currentUser.joinedEvents.length ? (
          currentUser.joinedEvents.map((event) => {
            return (
              <li key={event._id}>
                <h6>{event.title}</h6>
                <button type="button" 
                className="btn btn-outline-info btn-rounded" 
                data-mdb-ripple-color="dark"
                  onClick={() => {
                    handleLeaveEvent(event._id);
                  }}
                >
                  Leave Event
                </button>
              </li>
            );
          })
        ) : (
          <li>You didn't joined any event right now</li>
        )}
      </ul>
      </div>

      <div className="profile-btns">
        <Link to="/events/create">
          <button type="button" 
          className="btn btn-outline-info btn-rounded" 
          data-mdb-ripple-color="dark">Create an Event</button>{" "}
        </Link>

        <Link to={`/profile/${currentUser._id}/myspace`}>
          {" "}
          <button type="button" 
          className="btn btn-outline-info btn-rounded" 
          data-mdb-ripple-color="dark">Create a space</button>
        </Link>

        <button type="button" 
        className="btn btn-outline-info btn-rounded" 
        data-mdb-ripple-color="dark" 
        onClick={() => toggleEdit()}>Edit profile</button>
        {editTab && <EditProfileCard />}
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
}
