import { Link } from "react-router-dom";
import React from 'react';
import Table from "react-bootstrap/Table";
import { Year } from "./Year/YearInstance";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const YearTable = (years: Year[]) => {

  return (
    <Table striped bordered hover size="sm" variant="dark">
         <thead>
            <tr>
              <th>Year</th>
              <th>Global Mean Surface Temperature Anomaly</th>
              <th>Mean Carbon Dioxide Level (ppm)</th>
              <th>Methane Level (ppb)</th>
              <th>Nitrous Oxide Level (ppb)</th>
              <th>Ice Extent (km<sup>2</sup>)</th>
              <th>Absolute Sea Level Change Since 1880 (inches)</th>
            </tr>
          </thead>
          <tbody>
          {years.filter(currYear => parseInt(currYear.year_name) <= 2018).map(year => (
            <tr key={year.year_id}>
                <td>
                    <Link to={"/years/name="+year.year_name}>
                        {year.year_name}
                    </Link>
                </td>
                <td>{year?.temp_anomaly}</td>
                <td>{year?.co2}</td>
                <td>{year?.methane}</td>
                <td>{year?.nitrous_oxide}</td>
                <td>{year?.polar_ice}</td>
                <td>{year?.sea_level}</td>
            </tr>
          ))}
          </tbody>
    </Table>
  );
};

export default YearTable;