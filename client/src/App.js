import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path={""} element={""} />
      </Routes>
    </div>
  );
}
