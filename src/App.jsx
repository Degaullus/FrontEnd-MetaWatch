//General

import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Routes

import Faction from "./components/Faction/Faction";
import FactionSelected from "./components/FactionSelected/FactionSelected";
import Format from "./components/Format/Format";
import Homepage from "./components/Homepage/Homepage";
import Location from "./components/Location/Location";
import Navbar from "./components/Navbar/Navbar";
import LoadingBar from "./components/Loading/LoadingBar";
import Authentication from "./components/Authentication/Authentication";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {

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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
