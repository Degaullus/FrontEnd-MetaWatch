import Faction from './components/Faction/Faction';
import Format from './components/Format/Format';
import Homepage from './components/Homepage/Homepage';
import Location from './components/Location/Location';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import React from 'react';

function App() {
 

  return (
    <>
     <h1>Meta Watch here</h1>
     <Navbar />
      <Homepage />
      <Faction />
      <Format />
      <Location />
    </>
  )
}

export default App
