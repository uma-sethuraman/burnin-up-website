import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';

function About() {
    return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1> THIS IS THE ABOUT PAGE </h1>
      </header>
    </div>
    );
}

export default About;