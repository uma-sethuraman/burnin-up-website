import React from "react";
import "./App.css";
import NavBar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";

function Year2013() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2013</h1>
        <br></br>
        <p>World Population: 7,181,715,139</p>
        <p>Global Mean Surface Temperature Anomaly: 1.04</p>
        <p>Carbon Dioxide Levels: 394.91 ppm</p>
        <p>Methane Levels: 1814.1 ppm</p>
        <p>Nitrous Oxide Levels: 325.5 ppm</p>
        <p>Polar Ice Levels: 5.21 square kilometers</p>
        <Image src={require("../assets/temperature-graph.jpg")}/>
        <br></br>
      </header>
    </div>
  );
}

export default Year2013;