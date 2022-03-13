

export default function EventCard(props){
    
    const { _id, title, imageUrl, category, date, location } = props.event;

   
    return(
        <div>
            <h3>{title}</h3>

            <div key={_id} className="eventCard">
                <img src={imageUrl} alt="eventImg" />
                <h3>{category}</h3>
                <h3>{date}</h3>
                <h2>{location}</h2>
            </div>
       </div>
    )
}