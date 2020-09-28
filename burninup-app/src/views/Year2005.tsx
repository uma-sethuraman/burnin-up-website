import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import NavBar from "./components/OurNavbar";

function Year2005() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2005</h1>
        <br></br>
        <br></br>
        <p>Global Temperature: 10</p>
        <p>Carbon Dioxide Levels: 20</p>
        <p>Methane Levels: 30</p>
        <p>Nitrous Oxide Levels: 40</p>
        <p>Polar Ice Levels: 50</p>
      </header>
    </div>
  );
}

export default Year2005;