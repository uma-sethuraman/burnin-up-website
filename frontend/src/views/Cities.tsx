import { Link } from 'react-router-dom';
import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "./components/OurNavbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";


function Cities() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Cities </h1>
        <Image src={require("../assets/city-landing-photo-singapore.jpg")} fluid />
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
            <DropdownButton
              title= {"Zip Code"} >
                  <Dropdown.Item eventKey="1">78739</Dropdown.Item>
                  <Dropdown.Item eventKey="2">20134 </Dropdown.Item>
                  <Dropdown.Item eventKey="3"> 410 </Dropdown.Item>

            </DropdownButton>
            <DropdownButton
              title= {"Elevation"} >
                  <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Less than 5000 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Less than 10,000</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title= {"Time Zone"} >
                  <Dropdown.Item eventKey="1">China Standard Time</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Central Standard Time </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Central European Summer Time </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title= {"Location"} >
                  <Dropdown.Item eventKey="1">Asia</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Europe </Dropdown.Item>
                  <Dropdown.Item eventKey="3">North America</Dropdown.Item>
            </DropdownButton>
            
            <DropdownButton
              title= {"Population"} >
                  <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Less than 5 million </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Less than 50 million</Dropdown.Item>
            </DropdownButton>
            </ButtonGroup>
            </>
          </Form.Group>
        </Form>
        <Form></Form>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>City</th>
              <th>Country</th>
              <th>Air Quality</th>
              <th>Population</th>
              <th>Time Zone</th>
              <th>Elevation</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><Link to="/cities/austin">Austin</Link></td>
              <td><Link to="/countries/USA">United States</Link></td>
              <td>41.3125</td>
              <td>964,254</td>
              <td>Central Daylight Time (GMT -5)</td>
              <td>425ft</td>
            </tr>
            <tr>
              <td><Link to="/cities/beijing">Beijing</Link></td>
              <td><Link to="/countries/China">China</Link></td>
              <td>56.6875</td>
              <td>21.54 million</td>
              <td>China Standard Time (GMT + 8)</td>
              <td>144ft</td>
                    
            </tr>
            <tr>
              <td><Link to="/cities/paris">Paris</Link></td>
              <td><Link to="/countries/France">France</Link></td>
              <td>57</td>
              <td>2.148 million</td>
              <td>Central European Summer Time (GMT +2)</td>
              <td>115ft</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Cities;
