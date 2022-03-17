import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import userService from "../services/users";
import { AuthContext } from "../context/auth.context";
import LoadingComponent from "../components/Loading";
import eventsService from "../services/events";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

  function deleteEvent(eventId, userId) {
    eventsService.deleteEvent(eventId, userId).then((_) => {
      setIsRun(!isRun);
      props.setEventsIsRun(!props.eventsIsRun);
    });
  }

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 1 }).map((_, idx) => (
            <Col>
            <Card>
                <Card.Img variant="top" width={400} src={imageUrl} alt="eventImg" />
                <Card.Body>
                    <Card.Title><Link to={`/events/${_id}`}>
                    <h3>{title}</h3>
                    </Link></Card.Title>
                <Card.Text>
                <h3 className="card-text">{category}</h3>
        <h3 className="card-text">{date.toString().slice(0, 10)}</h3>
        <h2 className="card-text">{location}</h2>
        {currentUser._id ? (
          currentUser.createdEvents.some(
            (createdEvent) => createdEvent._id === _id
          ) ? (
            <button
              className="btn btn-dark btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => deleteEvent(_id, currentUser._id)}
            >
              Delete
            </button>
          ) : currentUser.joinedEvents.some(
              (joinedEvent) => joinedEvent._id === _id
            ) ? (
            <button
              type="button"
              className="btn btn-dark btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={handleLeaveEvent}
            >
              Leave the event
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-dark btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={handleJoinEvent}
            >
              Join this event!
            </button>
          )
        ) : (
          <p>Log in to join this event!</p>
        )}
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </div>
  );
}



