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

  function deleteEvent(eventId, userId) {
    eventsService.deleteEvent(eventId, userId).then((_) => {
      setIsRun(!isRun);
    });
  }

  return currentUser._id ? (
    <div className="card align-items-center">
      <div className="card-body">
        <h1>{currentUser.username}'s profile</h1>

        <img
          className="card-img-top"
          id="profileImg"
          src={currentUser.imageUrl}
          alt="profileimg"
          height="150px"
          width="150px"
        />
      </div>

      {editTab && <EditProfileCard />}

      <div className="card-body">
        <h4 className="card-title">Name:</h4>
        <p className="card-title">{currentUser.username}</p>
        <h4 className="card-text">Email:</h4>
        <p className="card-text">{currentUser.email}</p>
      </div>

      <div className="card-text">
        <h4 className="card-text">Events joined:</h4>
        <div className="card-text">
          {currentUser.joinedEvents.length ? (
            currentUser.joinedEvents.map((event) => {
              return (
                <div key={event._id}>
                  <li>{event.title}
                  <a
                    onClick={() => {
                      handleLeaveEvent(event._id);
                    }}
                  >
                    <img
                      className="trashButton"
                      src="https://www.pngmart.com/files/16/Trash-Basket-Transparent-Background.png"
                      height="20px"
                      width="20px"
                    ></img>
                  </a>      
                  </li>
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
                  <li>
                    {event.title}
                    <a
                      bi
                      bi-trash3-fill
                      // type="button"
                      // className="btn btn-outline-info btn-rounded"
                      // data-mdb-ripple-color="dark"
                      onClick={() => {
                        deleteEvent(event._id, currentUser._id);
                      }}
                    >
                      <img
                        src="https://www.pngmart.com/files/16/Trash-Basket-Transparent-Background.png"
                        height="20px"
                        width="20px"
                      ></img>
                    </a>
                  </li>
                </div>
              );
            })
          ) : (
            <li>You didn't created any event yet</li>
          )}
        </div>
      </div>

      <div className="card-text ">
        <Link to="/events/create">
          <button
            type="button"
            className="btn btn-outline-info btn-rounded"
            data-mdb-ripple-color="dark"
          >
            Create an Event
          </button>
        </Link>

        <Link to={`/profile/${currentUser._id}/myspace`}>
          <button
            type="button"
            className="btn btn-outline-info btn-rounded"
            data-mdb-ripple-color="dark"
          >
            My space
          </button>
        </Link>

        <button
          type="button"
          className="btn btn-outline-info btn-rounded"
          data-mdb-ripple-color="dark"
          onClick={() => toggleEdit()}
        >
          Edit profile
        </button>
        {editTab && <EditProfileCard currentUser={currentUser} />}
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
}
