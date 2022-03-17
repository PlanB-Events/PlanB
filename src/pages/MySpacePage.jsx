import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateSpaceForm from "../components/CreateSpaceForm";
import userService from "../services/users";
import SpaceDetails from "../components/SpaceDetails";
import LoadingComponent from "../components/Loading";

export default function MySpace(){

    const { id } = useParams("id");
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        userService.getUser(id).then((foundUser) => {
        setCurrentUser(foundUser);
        });
    }, [id]);

    return(currentUser._id ?
        <div className="createEventCard">
        {console.log("CURRENT",currentUser)}
        {console.log("SPACE",currentUser.space)}
            {currentUser.space ?
            <SpaceDetails spaceId = {currentUser.space._id} />
            :
            <CreateSpaceForm />
            }
        </div>
        :
        <LoadingComponent/>
    )
}