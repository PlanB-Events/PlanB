import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import AuthPage from "./pages/AuthPage.js";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <AuthPage />
      <HomePage />
      <Routes>
        <Route exact path={""} element={""} />
      </Routes>
    </div>
  );
}
