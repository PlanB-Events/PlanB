import "../App.css";
import { Link } from "react-router-dom";
import PastEventsCard from "../components/PastEventsCard.js";
import eventsService from "../services/events";
import { useEffect, useState } from "react";

function HomePage(props) {

  return ( 
    <div className="App pageContainer">
    
      <div className="card bg-white">
      <div className="card-body">
        <img className="card-img" src="/images/audience-1.jpg" alt="concert" />
        <div className="card-img-overlay d-flex">
        <Link to={`/events`} className="btn btn-dark btn-rounded align-self-center mx-auto">
          <h3>Find an event!</h3>
        </Link>
        </div>
      </div>
      </div>

      <div className="card bg-white">
      <div className="card-body">
        <PastEventsCard className="card-img"/>
        <div className=" d-flex card-img-overlay ">
        <h3 className=" btn btn-dark btn-rounded align-self-center mx-auto">Check out past events!</h3>
        </div>
      </div>
      </div>

      <div className="card bg-white">
      <div className="card-body">
        <img className="card-img" width={400} src="/images/spaghetti-1.jpg" alt="" />
        <div className=" d-flex card-img-overlay" >
              <Link to={`/events/${props.randomEvent._id}`} className="btn btn-dark btn-rounded align-self-center mx-auto">
              <h3>Get me a PlanB!</h3>
             </Link>
        </div>
      </div>
      </div>
    </div>
    
    
  );
}

export default HomePage;
