//General

import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import APIContextProvider from './context/apiContext';

// Routes

import Faction from './components/Faction/Faction';
import Format from './components/Format/Format';
import Homepage from './components/Homepage/Homepage';
import Location from './components/Location/Location';
import Navbar from './components/Navbar/Navbar';
import Authentication from './components/Authentication/Authentication';  
import NotFound from './components/NotFound/NotFound';

// Every Faction

import Beastmen from './components/Faction/Factions/Beastmen/Beastmen';
import Bretonnia from './components/Faction/Factions/Bretonnia/Bretonnia';
import Chaos from './components/Faction/Factions/Chaos/Chaos';
import ChaosDwarf from './components/Faction/Factions/ChaosDwarf/ChaosDwarf';
import DarkElf from './components/Faction/Factions/DarkElf/DarkElf';
import Dwarf from './components/Faction/Factions/Dwarf/Dwarf';
import Elf from './components/Faction/Factions/Elf/Elf';
import Empire from './components/Faction/Factions/Empire/Empire';
import Khemri from './components/Faction/Factions/Khemri/Khemri';
import Lizardmen from './components/Faction/Factions/Lizardmen/Lizardmen';
import Ogre from './components/Faction/Factions/Ogre/Ogre';
import Orcs from './components/Faction/Factions/Orcs/Orcs';
import Skaven from './components/Faction/Factions/Skaven/Skaven';
import Vampire from './components/Faction/Factions/Vampire/Vampire';
import WoodElf from './components/Faction/Factions/WoodElf/WoodElf';


function App() {
 

  return (
  
  <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/faction/factions/chaos" element={<Chaos />}/>
          <Route path="/format" element={<Format />} />
          <Route path="/location" element={<Location />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    
  )
}

export default App
