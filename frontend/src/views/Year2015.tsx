import React from "react";
import "./App.css";
import NavBar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";

function Year2015() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2015</h1>
        <br></br>
        <p>World Population: 7,349,472,099</p>
        <p>Global Mean Surface Temperature Anomaly: 1.04</p>
        <p>Carbon Dioxide Levels: 399.54 ppm</p>
        <p>Methane Levels: 1832.9 ppm</p>
        <p>Nitrous Oxide Levels: 328.0 ppm</p>
        <p>Arctic Sea Ice Extent: 4.62 square kilometers</p>
        <Image src={require("../assets/temperature-graph.png")}/>
        <br></br>
      </header>
    </div>
  );
}

export default Year2015;