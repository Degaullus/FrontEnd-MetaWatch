//General

import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLoading } from "./context/LoadingContext";

// Routes

import Faction from "./components/Faction/Faction";
import FactionSelected from "./components/FactionSelected/FactionSelected";
import Format from "./components/Format/Format";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Authentication from "./components/Authentication/Authentication";
import Footer from "./components/Footer/Footer";
import Favorites from "./components/Favorites/Favorites";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
import SearchResults from "./components/SearchBar/SearchResults"; // Make sure the path is correct

function App() {
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const [readyToShow, setReadyToShow] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setReadyToShow(false);

    //Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
      setReadyToShow(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div>
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/faction/:id" element={<FactionSelected />} />
          <Route path="/format" element={<Format />} />
          <Route path="/authentication" element={<Authentication />} />
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
