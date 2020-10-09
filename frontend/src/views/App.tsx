import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import LandingPage from './components/LandingPage/LandingPage';

function App() {

  // trying to retrieve data from the backend server
  const [currentTest, setCurrentTest] = useState("hi");

  useEffect(() => {
      fetch('/test').then(res => res.json().then(data => {
        setCurrentTest(data.test)
      })
    );
  }, []);

  return (
    <div className="App">
      <Navbar />
      <p> my message: {currentTest} </p>
      <LandingPage />
    </div>
  );
}

export default App;