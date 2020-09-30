import React from "react";
import "./App.css";
import Navbar from "./components/OurNavbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
function USA() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Container>
          <Jumbotron>
            <h1>welcome!</h1>
            <p> our page is about....</p>
          </Jumbotron>
        </Container>
        <h1>United States of America</h1>
        <br />
        <Table striped bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>High income</td>
            </tr>
            <tr>
              <td>Longtitude</td>
              <td>-77.032</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>38.8895</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>North America</td>
            </tr>
            <tr>
              <td>Capital City</td>
              <td>Washington D.C</td>
            </tr>
            <tr>
              <td>Average Temperature</td>
              <td>4.45</td>
            </tr>
            <tr>
              <td>pm2.5</td>
              <td>-4.2</td>
            </tr>
          </tbody>
        </Table>
        <Image src={require("../assets/USA_flag.jpg")} fluid />
        <br />
        <Image src={require("../assets/US_gdp.jpg")} fluid />
      </header>
    </div>
  );
}

export default USA;
