import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import HomePage from "./pages/HomePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";
import logo from "./assets/icon2.png";
import { useNavigate } from 'react-router-dom';

export default function App() {

  const navigate =  useNavigate();

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
            <Nav.Link as={Link} to="/auth">Map</Nav.Link>
            <Nav.Link as={Link} to="/">Get me a PlanB!</Nav.Link>
            <NavDropdown title={<img src={logo} width={30} height={27} alt="dropdown-logo"/>}>
              <NavDropdown.Item>Signup</NavDropdown.Item>
              <NavDropdown.Item>Login</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar> */}
      <Routes>
        <Route exact path={"/"} element={<HomePage/>} />
        <Route exact path={"/auth"} element={<AuthPage/>} />
      </Routes>
    </div>
  );
}
