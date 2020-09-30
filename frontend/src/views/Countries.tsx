import { Link } from "react-router-dom";
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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Countries() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Countries page</h1>
        <Image src={require("../assets/world-map.jpeg")} fluid />
        <Form>
          <Form.Group>
            <Form>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <>
              <ButtonGroup>
                <DropdownButton title={"Income Level"}>
                  <Dropdown.Item eventKey="1">High Income</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Middle Income</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Low Income</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title={"Region"}>
                  <Dropdown.Item eventKey="1">Europe</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Asia</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Middle East</Dropdown.Item>
                  <Dropdown.Item eventKey="4">North America</Dropdown.Item>
                  <Dropdown.Item eventKey="5">South America</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Africa</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Australia</Dropdown.Item>
                </DropdownButton>

                <DropdownButton title={"Capital City"}>
                  <Dropdown.Item eventKey="1">A to Z</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Z to A</Dropdown.Item>
                </DropdownButton>

                <DropdownButton title={"Average Temperature"}>
                  <Dropdown.Item eventKey="1">Low</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Middle</Dropdown.Item>
                  <Dropdown.Item eventKey="3">High</Dropdown.Item>
                </DropdownButton>

                <DropdownButton title={"pm2.5"}>
                  <Dropdown.Item eventKey="1">Low</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Middle</Dropdown.Item>
                  <Dropdown.Item eventKey="3">High</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </>
          </Form.Group>
        </Form>
        <Form></Form>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Country</th>
              <th>Income Level</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Region</th>
              <th>Capital City</th>
              <th>Average Temperature</th>
              <th>pm2.5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/countries/USA"> United States</Link>
              </td>
              <td>High income</td>
              <td>-77.032</td>
              <td>38.8895</td>
              <td>North America</td>
              <td>Washington D.C</td>
              <td>4.45</td>
              <td>-4.2</td>
            </tr>
            <tr>
              <td>
                <Link to="/countries/China"> China</Link>
              </td>
              <td>Upper Middle Income</td>
              <td>116.286</td>
              <td>40.0495</td>
              <td>East Asia and Pacific</td>
              <td>Beijing</td>
              <td>3.45</td>
              <td>400</td>
            </tr>
            <tr>
              <td>
                <Link to="/countries/France"> France</Link>
              </td>
              <td>High Income</td>
              <td>2.35097</td>
              <td>48.8566</td>
              <td>Europe & Central Asia</td>
              <td>Paris</td>
              <td>10.05</td>
              <td>13077</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Countries;
