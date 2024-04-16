import "./App.css";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
// Routes
import Faction from "./components/Faction/Faction";
import FactionSelected from "./components/FactionSelected/FactionSelected";
import Format from "./components/Format/Format";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Favorites from "./components/Favorites/Favorites";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SearchResults from "./components/SearchBar/SearchResults";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/faction/:id" element={<FactionSelected />} />
          <Route path="/format" element={<Format />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
