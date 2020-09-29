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
              <th>World Population</th>
              <th>Global Mean Surface Temperature Anomaly</th>
              <th>Carbon Dioxide Levels (ppm)</th>
              <th>Methane Levels (ppm)</th>
              <th>Nitrous Oxide Levels (ppm)</th>
              <th>Arctic Sea Ice Extent (km<sup>2</sup>)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="/climatechange/2013">2013</Link></td>
              <td>7,181,715,139</td>
              <td>1.04</td>
              <td>394.91</td>
              <td>1814.1</td>
              <td>325.5</td>
              <td>5.21</td>
            </tr>
            <tr>
            <td><Link to="/climatechange/2014">2014</Link></td>
              <td>7,265,785,946</td>
              <td>1.02</td>
              <td>397.51</td>
              <td>1816.9</td>
              <td>326.6</td>
              <td>5.22</td>
            </tr>
            <tr>
            <td><Link to="/climatechange/2015">2015</Link></td>
              <td>7,349,472,099</td>
              <td>1.04</td>
              <td>399.54</td>
              <td>1832.9</td>
              <td>328.0</td>
              <td>4.62</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default GeneralYears;