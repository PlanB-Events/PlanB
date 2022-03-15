import { useState } from "react";
import { useContext } from "react";
import eventsService from "../services/events";

export default function FilterButton(props){

    const [selectedCategory, setSelectedCategory] = useState("");

    function handleChange(event){
        setSelectedCategory(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        eventsService.getSelectedEvents(selectedCategory)
        .then((events)=>{props.setEventsData(events)})
        .catch((err)=>console.log(err))
    }

    return(
        <div className="filter-btn">
        
        <form onSubmit={handleSubmit}>
      
        <label>Type of event:</label>
        <select name='category' onChange={handleChange}>
            <option style={{display: "none"}} selected disabled value="">Choose category</option>
            <option value="all">See all categories</option>
            <option value="concert">Concert</option>
            <option value="cooking">Cooking</option>
            <option value="cultural">Cultural</option>
            <option value="cocial">Social</option>
            <option value="sport">Sport</option>
            <option value="other">Other</option>
        </select>
        
        <button class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Filter</button>
        </form>
      </div>
    )
}