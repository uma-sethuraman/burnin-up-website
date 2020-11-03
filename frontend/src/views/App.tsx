import React from 'react';
import Navbar from './components/OurNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import "./App.css";

/* Main page, displays landing page and navbar */
function App() {
  return (
    <div className="App">
      <Navbar />
      
      <LandingPage />
    </div>
  );
}

export default App;