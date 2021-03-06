import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import HomePage from "./pages/HomePage.jsx";
import EventsMainPage from "./pages/EventsMainPage";
import EventsListPage from "./pages/EventsListPage";
import EventsCreatePage from "./pages/EventsCreatePage";
import ProfilePage from "./pages/ProfilePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";
import logo from "./assets/user-logo.png";
import { AuthContext } from "./context/auth.context.js";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingComponent from "./components/Loading";
import MapPage from "./pages/MapPage.jsx";
import EventsDetailsPage from "./pages/EventsDetailsPage";
import MySpacePage from "./pages/MySpacePage";
import userService from "./services/users.js";
import eventsService from "./services/events.js";

export default function App() {

  const navigate= useNavigate()

  const {isLoggedIn, logOutUser, user, isLoading} = useContext(AuthContext);
  
  const [currentUser, setCurrentUser] = useState({})

  useEffect(()=>{
    userService.getUser(user._id)
    .then((foundUser)=>{
      setCurrentUser(foundUser)
    })
  }, [user._id])

  const [randomEvent, setRandomEvent] = useState({});

  useEffect(() => {
    eventsService.getRandomEvent().then((event) => {
     setRandomEvent(event);
    })
  }, []);

  function handleLogOut(){
    logOutUser();
    navigate("/");
  }

  return ( isLoading ?
    <LoadingComponent />
    :
    <div className="App">
     
      <Navbar className="navbar" variant="dark" style={{fontSize: 15}}>
        <Container>
      
          <Link style={{textDecoration: 'none'}} to="/">
            <Navbar.Brand>
              <img src="/PBlogo.png" width="30" height="27" className="d-inline-block align-top" alt="planb-logo"/>
              <span style={{fontSize: 15}}> PlanB - Events</span>
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events/map">Map</Nav.Link>
            <Nav.Link as={Link} to={`/events/${randomEvent._id}`}>Random PB!</Nav.Link>
            <NavDropdown title={isLoggedIn ? <img src={currentUser.imageUrl} style={{ width: 30, height: 30, borderRadius: 50}} alt="dropdown-logo"/>  : <img src={logo} width={30} height={27} alt="dropdown-logo"/>}>
              {!isLoggedIn && <NavDropdown.Item as={Link} to="/auth">Log in</NavDropdown.Item>}
             {isLoggedIn && <NavDropdown.Item as={Link} to={`/profile/${user._id}`}>Profile</NavDropdown.Item>}
             {isLoggedIn && <NavDropdown.Item as="button" onClick={()=>{handleLogOut()}}>Logout</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={<HomePage randomEvent={randomEvent}/>} />
        <Route exact path={"/auth"} element={<AuthPage/>} />
        <Route exact path={"/events"} element={<EventsMainPage/>} />
        <Route exact path={"/events/:id"} element={<EventsDetailsPage/>} />
        <Route exact path={"/events/list/:category"} element={<EventsListPage/>} />
        <Route exact path={"/events/create"} element={<EventsCreatePage/>} />
        <Route exact path={"/profile/:id"} element={<ProfilePage />} />

        <Route exact path={"/events/map"} element={<MapPage />} />
        <Route exact path={"/profile/:id/myspace"} element={<MySpacePage />} />
      </Routes>
    </div>
  );
}
