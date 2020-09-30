import React from "react";
import "./App.css";
import NavBar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";

function Year2014() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2014</h1>
        <br></br>
        <p>World Population: 7,265,785,946</p>
        <p>Global Mean Surface Temperature Anomaly: 1.02</p>
        <p>Carbon Dioxide Levels: 397.51 ppm</p>
        <p>Methane Levels: 1816.9 ppm</p>
        <p>Nitrous Oxide Levels: 326.6 ppm</p>
        <p>Arctic Sea Ice Extent: 5.22 square kilometers</p>
        <Image src={require("../assets/temperature-graph.jpg")}/>
        <br></br>
      </header>
    </div>
  );
}

export default Year2014;