import React from "react";
import "./App.css";
import NavBar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";

function Year2010() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Year 2010</h1>
        <br></br>
        <p>Global Temperature: 100</p>
        <p>Carbon Dioxide Levels: 200</p>
        <p>Methane Levels: 300</p>
        <p>Nitrous Oxide Levels: 400</p>
        <p>Polar Ice Levels: 500</p>
        <Image src={require("../assets/example-climate-change-graph.jpg")}/>
        <br></br>
      </header>
    </div>
  );
}

export default Year2010;