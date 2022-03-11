import "../App.css";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="App pageContainer">
            <div className="findEvent">
            <img src="/images/audience-1.jpg" alt="concert"/>
                <Link to={`/events`}>
                <h3>Find an event!</h3>
                </Link>
            </div>

            <div className="pastEvents">
            <img src="/images/sun-concert-1.jpg" alt=""/>
                
                <h3>Check out past events!</h3>
                
            </div>
 
            <div className="findEvent">
            <img src="/images/spaghetti-1.jpg" alt=""/>
                <Link to={`/events/getmeaplanb`}>
                 <h3>Get me a PlanB!</h3>
                </Link>
            </div>
    </div>
  );
}

export default HomePage;
