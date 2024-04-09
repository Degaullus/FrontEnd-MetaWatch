//General

import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLoading } from "./context/LoadingContext";

// Routes

import Faction from "./components/Faction/Faction";
import FactionSelected from "./components/FactionSelected/FactionSelected";
import Format from "./components/Format/Format";
import Homepage from "./components/Homepage/Homepage";
import Location from "./components/Location/Location";
import Navbar from "./components/Navbar/Navbar";
import LoadingBar from "./components/Loading/LoadingBar";
import Authentication from "./components/Authentication/Authentication";
import Footer from "./components/Footer/Footer";
import Favorites from "./components/Favorites/Favorites";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  const location = useLocation();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);

    // Simulate loading for at least 0.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div>
      <LoadingBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/faction" element={<Faction />} />
        <Route path="/faction/factions/:id" element={<FactionSelected />} />
        <Route path="/format" element={<Format />} />
        <Route path="/location" element={<Location />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
