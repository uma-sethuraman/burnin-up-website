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
        <h4>
          Caitlin Lien
        </h4>
        <h4>
          Caitlin O'Callaghan
        </h4>
        <h4>
          Cherry Sun
        </h4>
        <h4>
          Lauren Mangibin
        </h4>
        <h4>
          Samantha Tuapen
        </h4>
        <h4>
          Uma Sethuraman
        </h4>
      </header>
    </div>
    );
}

export default About;