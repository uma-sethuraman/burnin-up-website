import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;