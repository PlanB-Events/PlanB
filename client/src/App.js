import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";
import logo from "./assets/icon2.png";
import { AuthContext } from "./context/auth.context.js";
import { useContext } from "react";

export default function App() {
  const navigate= useNavigate()

  const {isLoggedIn, logOutUser} = useContext(AuthContext);

  function handleLogOut(){
    logOutUser();
    navigate("/");
  }

  return (
    <div className="App">
     
      <Navbar bg="dark" variant="dark">
        <Container>
      
          <Link style={{textDecoration: 'none'}} to="/">
            <Navbar.Brand>
              <img src="/icon2.png" width="30" height="27" className="d-inline-block align-top" alt="planb-logo"/>
              {" "}
              PlanB - Events
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/auth">Map</Nav.Link>
            <Nav.Link as={Link} to="/">Get me a PlanB!</Nav.Link>
            <NavDropdown title={<img src={logo} width={30} height={27} alt="dropdown-logo"/>}>
              {!isLoggedIn && <NavDropdown.Item as={Link} to="/auth">Log in</NavDropdown.Item>}
              {isLoggedIn && <NavDropdown.Item as={Link} to="/">Profile</NavDropdown.Item>}
              {isLoggedIn && <NavDropdown.Item as="button" onClick={()=>{handleLogOut()}}>Logout</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path={"/"} element={<HomePage/>} />
        <Route exact path={"/auth"} element={<AuthPage/>} />
        <Route exact path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
