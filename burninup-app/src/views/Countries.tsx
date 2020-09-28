import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "./components/OurNavbar";

function Countries() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Countries page</h1>
        <Image src={require("../assets/map.jpg")} fluid />
        <Form>
          <Form.Group>
            <Form.Label>Search Bar</Form.Label>
            <Form.Control placeholder="Enter search" />
          </Form.Group>
        </Form>
        <Form></Form>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Country</th>
              <th>Continent</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>U.S.</td>
              <td>North America</td>
              <td>2</td>
            </tr>
            <tr>
              <td>China</td>
              <td>Asia</td>
              <td>3</td>
            </tr>
            <tr>
              <td>France</td>
              <td>Europe</td>
              <td>4</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Countries;
