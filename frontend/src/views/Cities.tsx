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
        <h1>Cities page</h1>
        <Image src={require("../assets/city-landing-photo-singapore.jpg")} fluid />
        <Form>
          <Form.Group>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <>
              {[
                "Primary",
                "Secondary",
                "Success",
                "Info",
                "Warning",
                "Danger",
              ].map((variant) => (
                <DropdownButton
                  as={ButtonGroup}
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title={variant}
                >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3" active>
                    Active Item
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
              ))}
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
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><Link to="/cities/austin">Austin</Link></td>
              <td><Link to="/countries/USA">United States</Link></td>
              <td>2</td>
            </tr>
            <tr>
              <td><Link to="/cities/beijing">Beijing</Link></td>
              <td><Link to="/countries/China">China</Link></td>
              <td>3</td>
            </tr>
            <tr>
              <td><Link to="/cities/paris">Paris</Link></td>
              <td><Link to="/countries/France">France</Link></td>
              <td>4</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Cities;
