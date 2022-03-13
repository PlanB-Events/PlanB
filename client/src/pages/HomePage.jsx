import "../App.css";
import { Link } from "react-router-dom";
import PastEventsCard from "../components/PastEventsCard.js";


function HomePage() {
  return (
    <div className="App pageContainer">
            <div className="findEvent">
            <img width={400} src="/images/audience-1.jpg" alt="concert"/>
                <Link to={`/events`}>
                <h3>Find an event!</h3>
                </Link>
            </div>

            <div className="pastEvents">  
              <PastEventsCard />
              <h3>Check out past events!</h3>
            </div>
 
            <div className="findEvent">
            <img width={400} src="/images/spaghetti-1.jpg" alt=""/>
                <Link to={`/events/getmeaplanb`}>
                 <h3>Get me a PlanB!</h3>
                </Link>
            </div>
    </div>
  );
}

export default HomePage;
