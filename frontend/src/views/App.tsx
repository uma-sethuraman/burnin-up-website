import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 

function App() {


  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="hook">
          <h3> Our world is burning up. </h3>
          <h2>it's "burning up, burning up for you baby." - Jonas Brothers </h2>
        </div>
      </header>
      <body className="App-body">
        <div className="explore">
          <h3 style={{ color: 'white' }}>Explore</h3>
          <div className="row">
            <div className="column">
              <Image src={require("../assets/austin-capitol.jpg")} height="250"/>
              <Button variant="outline-light" href="/cities">Cities</Button>{' '}
            </div>
            <div className="column">
              <Image src={require("../assets/city-landing-photo-singapore.jpg")} height="250"/>
              <Button variant="outline-light" href="/countries">Countries</Button>{' '}
            </div>
            <div className="column">
              <Image src={require("../assets/landing-bg.jpg")} height="250"/>
              <Button variant="outline-light" href="/climateChange">Climate Change</Button>{' '}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;