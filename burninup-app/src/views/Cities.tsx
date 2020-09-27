import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Cities() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cities page</h1>
        <div>
          <Button variant="primary">Landing page</Button>{" "}
        </div>
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
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default Cities;
