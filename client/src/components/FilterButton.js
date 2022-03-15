import { useState } from "react";
import { useContext } from "react";
import eventsService from "../services/events";

export default function FilterButton({events}){

    const [formData, setFormData] = useState([]);
    const [category, setCategory] = useState("");


    function handleSubmit(event){
        eventsService
        .getSelectedEvents(category)
        .then((response) => events = response.data);
    }

    function handleCategory(e){
        setCategory(e.target.value);
    }

    return(
        <div className="filter-btn">
        
        <form onSubmit={handleSubmit}>
      
        <label>Type of event:</label>
        <select name='category' onChange={handleCategory}>
            <option value="Concert">Concert</option>
            <option value="Cooking">Cooking</option>
            <option value="Cultural">Cultural</option>
            <option value="Social">Social</option>
            <option value="Sport">Sport</option>
            <option value="Other">Other</option>
        </select>
        
        <button type="submit">Filter</button>
        </form>
      </div>
    )
}