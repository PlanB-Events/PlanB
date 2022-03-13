import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import userService from "../services/users"
import LoadingComponent from "../components/Loading"
import EditProfileCard from "../components/EditProfileCard"

export default function ProfilePage(){
    const {id} = useParams("id")
    const [currentUser, setCurrentUser] = useState({})
    useEffect(()=>{
        userService.getUser(id)
        .then(foundUser =>{
            setCurrentUser(foundUser)
        })
    }, [id])

    const [editTab, setEditTab] = useState(false)

    function toggleEdit(){
        setEditTab(!editTab)
    }
    

    return( currentUser._id ? 
        <div>
            <h1>This is Profile page</h1>
            <img src={currentUser.imageUrl} alt="profileimg" height="150px" width="150px"/>
            <h4>Name:</h4>
            <p>{currentUser.username}</p>
            <h4>Email:</h4>
            <p>{currentUser.email}</p>
            <h4>Events joined:</h4>
            <ul>
            {currentUser.joinedEvents.map((element) => { 
                return (
                    <li>{element.title}</li>
                )})
            }
            </ul>
            
            
            <Link to="/events/create"> <button>Create an Event</button> </Link>

            <Link to="/profile/myspace"> <button>Create a space</button></Link>

             <button onClick={()=> toggleEdit()}>Edit profile</button>
             {editTab && <EditProfileCard />}

        </div>
        : <LoadingComponent />
    )
}