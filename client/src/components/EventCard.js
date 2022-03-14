import { Link } from "react-router-dom";

export default function EventCard(props){
    
    const { _id, title, imageUrl, category, date, location } = props.event;

   
    return(
        <div>
            <Link to={`/events/${_id}`}>
            <h3>{title}</h3>
            </Link>

            <div key={_id} className="eventCard">
                <img width={400} src={imageUrl} alt="eventImg" />
                <h3>{category}</h3>
                <h3>{date}</h3>
                <h2>{location}</h2>
            </div>
       </div>
    )
}