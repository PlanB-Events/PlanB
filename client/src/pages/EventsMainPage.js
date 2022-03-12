import { Link } from "react-router-dom";
import eventsService from "../services/events";

export default function EventsMainPage(){

    return(
        <div className="containerDiv">
            <div className="filter-btn">
            <button>Choose a date button</button>
            </div>

           <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                <h3>All events</h3>
                </Link>
            </div>

            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>  
                <h3>Concerts</h3>
                </Link>
            </div>
 
            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                 <h3>Sport plans</h3>
                </Link>
            </div> 

            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                 <h3>Cooking plans</h3>
                </Link>
            </div> 

            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                 <h3>Cultural plans</h3>
                </Link>
            </div> 

            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                 <h3>Social plans</h3>
                </Link>
            </div> 

            <div>
            <img src="/public/images/spaghetti-1.jpg" alt="" style={{ maxWidth: "400px" }}/>
                <Link to={`/events/category-list`}>
                 <h3>Other plans</h3>
                </Link>
            </div> 
        </div>
    )
}