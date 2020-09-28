import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Navbar from './components/OurNavbar';

function Cities() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Cities page</h1>
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
              <th>City</th>
              <th>Country</th>
              <th>Air Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Austin</td>
              <td>United States</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Beijing</td>
              <td>China</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Paris</td>
              <td>France</td>
              <td>4</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Cities;
