import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import userService from "../services/users"
import LoadingComponent from "../components/Loading"


export default function ProfilePage(){
    const {id} = useParams("id")
    const [currentUser, setCurrentUser] = useState({})
    useEffect(()=>{
        userService.getUser(id)
        .then(foundUser =>{
            setCurrentUser(foundUser)
        })
    }, [])

    return( currentUser._id ? 
        <div>
            <h1>This is Profile page</h1>
            <img src={currentUser.imageUrl} height="150px" width="150px"/>
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
            
             <button>Edit profile</button>

            <Link to="/events/create"> <button>Create an Event</button> </Link>

            <Link to="/profile/myspace"> <button>Become a host</button></Link>

        </div>
        : <LoadingComponent />
    )
}