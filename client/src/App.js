import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";
import logo from "./assets/icon2.png"

export default function App() {
  return (
    <div className="App">
     
      {/* <Navbar bg="dark" variant="dark">
        <Container>
      
          <Link style={{textDecoration: 'none'}} to="/">
            <Navbar.Brand>
              <img src="/icon2.png" width="30" height="27" className="d-inline-block align-top" alt="planb-logo"/>
              {" "}
              PlanB - Events
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link style={{textDecoration: "none"}} to="/auth"><Nav.Link disabled>Map</Nav.Link></Link>
            <Link style={{textDecoration: "none"}} to="/"><Nav.Link disabled>Get me a PlanB!</Nav.Link></Link>
            <NavDropdown title={<img src={logo} width={30} height={27} alt="dropdown-logo"/>}>
              <Link style={{textDecoration: 'none'}} to="/"><NavDropdown.Item>Signup</NavDropdown.Item></Link>
              <Link style={{textDecoration: 'none'}} to="/"><NavDropdown.Item>Login</NavDropdown.Item></Link>
              <Link style={{textDecoration: 'none'}} to="/"><NavDropdown.Item>Logout</NavDropdown.Item></Link>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar> */}
      <Routes>
        <Route exact path={"/"} element={<HomePage/>} />
        <Route exact path={"/auth"} element={<AuthPage/>} />
        <Route exact path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
