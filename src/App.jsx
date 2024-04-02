import Faction from './components/Faction/Faction';
import Format from './components/Format/Format';
import Homepage from './components/Homepage/Homepage';
import Location from './components/Location/Location';
import Navbar from './components/Navbar/Navbar';
import Authentication from './components/Authentication/Authentication';  
import NotFound from './components/NotFound/NotFound';
import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { DataContext } from './context/DataContext';

function App() {
 

  return (
  
  <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/format" element={<Format />} />
          <Route path="/location" element={<Location />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    
  )
}

export default App
