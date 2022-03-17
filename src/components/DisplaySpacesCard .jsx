import { useEffect, useState } from "react"
import spacesService from "../services/spaces.js"
import SpaceCard from "./SpaceCard.jsx"

export default function DisplaySpacesCard (){

    const [allSpaces, setAllSpaces] = useState([])


    useEffect(()=>{
        spacesService
        .getAllSpaces()
        .then((spaces)=>{setAllSpaces(spaces)})
    }, [])


    return(
        <div className="spaceContainerSection">
          <h2>Browse Spaces</h2>
          <div className="spacesContainer">
            {allSpaces.map((space)=>{
                return(
                    <SpaceCard key={space._id} space={space}/>
                )
            })}
          </div>
        </div>
    )
}