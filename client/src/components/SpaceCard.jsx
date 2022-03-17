

export default function SpaceCard(props){

    const {_id, name, imageUrl, availableDates, availableHours, capacity, address } = props.space;

    return(
        <div className="spaceCardContainer">
            <div key={_id} className="spaceCard">
                <img src={imageUrl} alt="spaceImg" />
                <h3>{name}</h3>
                <h3>{address.direction}</h3>
                <h2>Date: {availableDates[0].slice(0, 10)}</h2>
                <p>Available Hours: {availableHours.map((hour)=>{return(<span>{hour}</span>)})}</p>
                <h2>Capacity: {capacity}</h2>
            </div>
        </div>
    )
}