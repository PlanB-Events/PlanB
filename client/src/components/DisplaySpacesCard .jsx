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
        <div>
          <div>
          <h2>Browse Spaces</h2>
          {allSpaces.map((space)=>{
            return(
                <SpaceCard key={space._id} space={space}/>
               )
          })}
        </div>
        </div>
    )
}