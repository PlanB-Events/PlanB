import { useNavigate } from "react-router-dom";

export default function GoBackButton(){
    const navigate= useNavigate();

    return(
        <button type="button" className="btn btn-dark btn-rounded" data-mdb-ripple-color="dark" onClick={() => navigate(-1)}>Go Back</button>
    )
}