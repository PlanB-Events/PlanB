import { useEffect, useState } from "react"
import spacesService from "../services/spaces";
import petsTrueLogo from "../assets/pet.svg";
import beveragesTrueLogo from "../assets/byob.svg";
import covidTrueLogo from "../assets/virus-test-tube-icon-black-green.svg";
import wheelchairTrueLogo from "../assets/wheelchair.svg";
import LoadingComponent from "./Loading";

export default function SpaceDetails(props){

    const [currentSpace, setCurrentSpace] = useState({})

    useEffect(()=>{
        spacesService.getSpace(props.spaceId)
        .then((space)=>{setCurrentSpace(space)})
    }, [props.spaceId])


    return(currentSpace._id ?
        <div className="createEventCard">
            <h1>{currentSpace._name}</h1>
            <img src={currentSpace.imageUrl} alt="Space_Img"/>
            <p>{currentSpace.description}</p>
            <h3>Available Hours</h3>
            <ul>
            {currentSpace.availableHours.map((hour)=>{
                return (<li key={hour}>{hour}</li>)
            })}
            </ul>
            <p>
                <span>Available Date: {currentSpace.availableDates[0].slice(0, 10)}</span>
                <span>Capacity: {currentSpace.capacity}</span>
            </p>
            <p>
                <span>Address: {currentSpace.address.direction}</span>
            </p>
            {currentSpace.allowedPets && <img src={petsTrueLogo} alt="features"/>}
            {currentSpace.allowedBeverages && <img src={beveragesTrueLogo} alt="features"/>}
            {currentSpace.covidTest && <img src={covidTrueLogo} alt="features"/>}
            {currentSpace.wheelchairAccess && <img src={wheelchairTrueLogo} alt="features"/>}

        </div>
        :
        <LoadingComponent/>
    )
}