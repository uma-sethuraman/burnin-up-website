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
              <td>Population: </td>
              <td>x million</td>
            </tr>
            <tr>
              <td>Time Zone: </td>
              <td>x Time</td>
            </tr>
            <tr>
              <td>Elevation: </td>
              <td>x ft</td>
            </tr>
          </tbody>
        </Table>
        <Image src={require("../assets/France_flag.jpg")} fluid />
        <br />
      </header>
    </div>
  );
}

export default France;
