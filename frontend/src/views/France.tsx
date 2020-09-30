import React from "react";
import "./App.css";
import Navbar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";

function France() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>France</h1>
        <br />
        <Table striped bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>High Income</td>
            </tr>
            <tr>
              <td>Longtitude</td>
              <td>2.35097</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>48.8566</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>Europe & Central Asia</td>
            </tr>
            <tr>
              <td>Capital City</td>
              <td>Paris</td>
            </tr>
            <tr>
              <td>Average Temperature</td>
              <td>10.05</td>
            </tr>
            <tr>
              <td>pm2.5</td>
              <td>13077</td>
            </tr>
          </tbody>
        </Table>
        <Image src={require("../assets/France_flag.jpg")} fluid />
        <Image src={require("../assets/france-gdp.png")} fluid />
        <br />
      </header>
    </div>
  );
}

export default France;
