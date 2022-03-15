import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';


export default function EventsMainPage(){

    return(
        <div className="containerDiv">
            <div className="filter-btn">
            <button type="button" class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark">Choose a date</button>
            </div>

            <div className="card bg-white text-white">
            <div className="card-body">
                <img className="card-img" src="/images/allEventsç.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <div className="card-img-overlay">
                    <Link to={`/events/list/all`} className="btn btn-outline-info btn-rounded">
                    <h3>All events</h3>
                    </Link>
                </div>
            </div>
            </div>

            <div className="card bg-white text-white" >
                <div className="card-body">
                    <img src="/images/audience-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/concerts`} className="btn btn-primary">  
                        <h3>Concerts</h3>
                        </Link>
                    </div>
                </div> 
            </div>

                <div className="card">
                    <div className="card-body">
                    <img src="/images/sportsPB/soccer-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/sport`} className="btn btn-primary">
                        <h3>Sport plans</h3>
                        </Link>
                    </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img src="/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/cooking`} className="btn btn-primary">
                        <h3>Cooking plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img src="/images/culturalPlans.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/cultural`} className="btn btn-primary">
                        <h3>Cultural plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img src="/images/pedralbes-festival.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/social`} className="btn btn-primary">
                        <h3>Social plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>
                
                <div className="card">
                    <div className="card-body">
                    <img src="/images/sun-concert-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                    <div className="card-title">
                        <Link to={`/events/list/other`} className="btn btn-primary">
                        <h3>Other plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>
        </div>
    )
}