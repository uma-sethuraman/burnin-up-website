import { Link } from 'react-router-dom';
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

function GeneralYears() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Global Climate Change</h1>
        <Image src={require("../assets/fire.jpg")} fluid />
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
              <th>Year</th>
              <th>Global Temperature</th>
              <th>Carbon Dioxide Level</th>
              <th>Methane Level</th>
              <th>Nitrous Oxide Level</th>
              <th>Polar Ice Coverage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="/climatechange/2000">2000</Link></td>
              <td>25</td>
              <td>50</td>
              <td>100</td>
              <td>125</td>
              <td>150</td>
            </tr>
            <tr>
            <td><Link to="/climatechange/2005">2005</Link></td>
              <td>10</td>
              <td>20</td>
              <td>30</td>
              <td>40</td>
              <td>50</td>
            </tr>
            <tr>
            <td><Link to="/climatechange/2010">2010</Link></td>
              <td>10</td>
              <td>20</td>
              <td>30</td>
              <td>40</td>
              <td>50</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default GeneralYears;