import React from "react";
import "./App.css";
import NavBar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";

function Year2000() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2000</h1>
        <br></br>
        <p>Global Temperature: 25</p>
        <p>Carbon Dioxide Levels: 50</p>
        <p>Methane Levels: 100</p>
        <p>Nitrous Oxide Levels: 125</p>
        <p>Polar Ice Levels: 150</p>
        <Image src={require("../assets/example-climate-change-graph.jpg")}/>
        <br></br>
      </header>
    </div>
  );
}

export default Year2000;