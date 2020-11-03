import React from 'react';
import Navbar from './components/OurNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <LandingPage />
    </div>
  );
}

export default App;