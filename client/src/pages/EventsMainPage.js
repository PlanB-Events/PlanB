import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';


export default function EventsMainPage(){

    return(
        <div className="containerDiv">
            <div className="card bg-white">
                <div className="card-body">
                    <img className="card-img" src="/images/allEventsÃ§.jpg" alt="" />
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/all`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>All events</h3>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card bg-white " >
                <div className="card-body">
                    <img className="card-img" src="/images/audience-1.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/concert`} className="btn btn-dark btn-rounded align-self-center mx-auto">  
                        <h3>Concerts</h3>
                        </Link>
                    </div>
                </div> 
            </div>

                <div className="card">
                 <div className="card-body">
                    <img className="card-img" src="/images/sportsPB/soccer-1.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/sport`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>Sport plans</h3>
                        </Link>
                    </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img className="card-img" src="/images/spaghetti-1.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/cooking`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>Cooking plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img className="card-img" src="/images/culturalPlans.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/cultural`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>Cultural plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <img className="card-img" src="/images/pedralbes-festival.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/social`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>Social plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>
                
                <div className="card">
                    <div className="card-body">
                    <img className="card-img" src="/images/sun-concert-1.jpg" alt=""/>
                    <div className="card-img-overlay d-flex">
                        <Link to={`/events/list/other`} className="btn btn-dark btn-rounded align-self-center mx-auto">
                        <h3>Other plans</h3>
                        </Link>
                    </div> 
                    </div>
                </div>
        </div>
    )
}