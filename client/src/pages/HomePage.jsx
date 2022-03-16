import "../App.css";
import { Link } from "react-router-dom";
import PastEventsCard from "../components/PastEventsCard.js";
import eventsService from "../services/events";
import { useEffect, useState } from "react";

function HomePage() {
  const [randomEvent, setRandomEvent] = useState({});

  useEffect(() => {
    eventsService.getRandomEvent().then((event) => {
      setRandomEvent(event);
    });
  }, []);

  return (
    <div className="App pageContainer">
      <div className="card bg-white">
        <img className="card-img" src="/images/audience-1.jpg" alt="concert" />
        <div className="card-img-overlay d-flex">
        <Link to={`/events`} className="btn btn-outline-primary btn-rounded align-self-center mx-auto">
          <h3>Find an event!</h3>
        </Link>
        </div>
      </div>

      <div className="card bg-white">
        <PastEventsCard className="card-img"/>
        <div className="card-img-overlay d-flex">
        <h3 className="align-self-center mx-auto">Check out past events!</h3>
        </div>
      </div>

      <div className="card bg-white">
        <img className="card-img" src="/images/spaghetti-1.jpg" alt="" />
        <div className="card-img-overlay d-flex">
              <Link to={`/events/${randomEvent._id}`} className="btn btn-outline-primary btn-rounded align-self-center mx-auto">
              <h3>Get me a PlanB!</h3>
             </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
