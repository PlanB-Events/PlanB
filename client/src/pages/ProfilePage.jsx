import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../services/users";
import LoadingComponent from "../components/Loading";
import EditProfileCard from "../components/EditProfileCard";
import eventsService from "../services/events";

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

  function deleteEvent(eventId, userId){
    eventsService.deleteEvent(eventId, userId)
    .then((_)=>{
      setIsRun(!isRun);
    })
  }

  return currentUser._id ? (
    <div className="containerDiv">
      <div className="profile-header">
        <h1>{currentUser.username}'s profile</h1>
     
      <img id="profileImg"
        src={currentUser.imageUrl}
        alt="profileimg"
        height="150px"
        width="150px"
      />
    </div>
    {editTab && <EditProfileCard />}
      <div className="userData">
        <h4>Name:</h4>
        <p>{currentUser.username}</p>
        <h4>Email:</h4>
        <p>{currentUser.email}</p>
      </div>

      <div className="eventsData">
      <h4>Events joined:</h4>
      <div>
        {currentUser.joinedEvents.length ? (
          currentUser.joinedEvents.map((event) => {
            return (
              <div key={event._id}>
                <li>{event.title}</li>
                <button
                  type="button"
                  class="btn btn-outline-info btn-rounded"
                  data-mdb-ripple-color="dark"
                  onClick={() => {
                    handleLeaveEvent(event._id);
                  }}
                >
                  Leave Event
                </button>
              </div>
            );
          })
        ) : (
          <li>You didn't joined any event right now</li>
        )}
      </div>
      <h4>Created Events:</h4>
      <div>
        {currentUser.createdEvents.length ? (
          currentUser.createdEvents.map((event) => {
            return (
              <div key={event._id}>
                <li>{event.title}</li>
                <button type="button" 
                className="btn btn-outline-info btn-rounded" 
                data-mdb-ripple-color="dark"
                  onClick={() => {
                    deleteEvent(event._id, currentUser._id);
                  }}
                >
                  Delete Event
                </button>
              </div>
            );
          })
        ) : (
          <li>You didn't created any event yet</li>
        )}
      </div>
      </div>

      <div className="profile-btns">
        <Link to="/events/create">
          <button type="button" 
          className="btn btn-outline-info btn-rounded" 
          data-mdb-ripple-color="dark">Create an Event</button>
        </Link>

        <Link to={`/profile/${currentUser._id}/myspace`}>
          <button type="button" 
          className="btn btn-outline-info btn-rounded" 
          data-mdb-ripple-color="dark">My space</button>
        </Link>

      <button
        type="button"
        className="btn btn-outline-info btn-rounded"
        data-mdb-ripple-color="dark"
        onClick={() => toggleEdit()}
      >
        Edit profile
      </button>
<<<<<<< HEAD
     
=======
      {editTab && <EditProfileCard currentUser={currentUser}/>}
>>>>>>> bef5f00daa097a4c50cb948bd310e7a1d1f874e4
    </div>
    </div>
  ) : (
    <LoadingComponent />
  );
}
