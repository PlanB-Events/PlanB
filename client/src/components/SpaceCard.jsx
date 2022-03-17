

export default function SpaceCard(props){

    const {_id, name, imageUrl, availableDates, availableHours, capacity, address } = props.space;

    return(
        <div className="spaceCardContainer">
            <div key={_id} className="spaceCard">
                <img src={imageUrl} alt="spaceImg" />
                <h3>{name}</h3>
                <h3>{address.direction}</h3>
                <h2>{availableDates}</h2>
                <h2>{availableHours}</h2>
                <h2>{capacity} </h2>
            </div>
        </div>
    )
}