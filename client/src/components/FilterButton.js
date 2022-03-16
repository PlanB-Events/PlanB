import { useEffect, useState } from "react";
import { useContext } from "react";
import eventsService from "../services/events";

export default function FilterButton(props){

    const defaultDate = new Date();

    const [filteredEvents, setFilteredEvents] = useState(props.eventsData)

    function filterEvents(event){
        console.log("PROPSDATA", props.eventsData)
        const copiedArr = filteredEvents.map(plan=>plan)
        const filterArr = copiedArr.filter((plan)=>{
            // console.log("PLAN", plan)
            // console.log("FIRSTPART", plan.date.toString().slice(0, 10))
            // console.log("SECONDPART", event.target.value)
           // return plan.date.toString().slice(0, 10) === event.target.value
           console.log("hola");
           return plan
        })
        console.log("FILTEREDARR", filterArr)
        setFilteredEvents(filterArr)
        props.setEventsData(filterArr)
    }

    return(
        <div className="filter-btn">

            <label>Select a date:</label>
            <input name="date" value={defaultDate} type="date" min={new Date().toISOString().slice(0, 10)} onChange={filterEvents}/>

      </div>
    )
}