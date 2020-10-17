import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import ImageBackground from "react";
import View from "react";
import "./YearInstance.css";
import Carousel from "react-bootstrap/Carousel";
import OurCarousel from "../OurCarousel";
import OurMap from "../Map/OurMap";
import Slide from "../../../Slide";
import { useState, useEffect } from 'react';
import axios from "axios";
import Image from "react-bootstrap/Image";


const YearInstance = (name: any) => {

  let [year, setYear] = React.useState<Year>();
    
  // gets data from API
  const getData = () => {
    axios.get("/api/years/name="+name.name)
    .then((response)=>{
        setYear(JSON.parse(JSON.stringify(response.data)) as Year);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  getData();
  
  return (
    <div className="YearInstance">
      <Navbar />
      <header className="App-header">
        <header className="Year-header">
            <h3> {year?.year_name} </h3>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Global Mean Surface Temperature Anomaly</td>
              <td>{year?.temp_anomaly}</td>
            </tr>
            <tr>
              <td>Mean Carbon Dioxide Level (ppm)</td>
              <td>{year?.co2}</td>
            </tr>
            <tr>
              <td>Methane Level (ppb)</td>
              <td>{year?.methane}</td>
            </tr>
            <tr>
              <td>Nitrous Oxide Level (ppb)</td>
              <td>{year?.nitrous_oxide}</td>
            </tr>
            <tr>
              <td>Ice Extent (km<sup>2</sup>)</td>
              <td>{year?.polar_ice}</td>
            </tr>
            <tr>
              <td>Absolute Sea Level Change Since 1880 (inches)</td>
              <td>{year?.sea_level}</td>
            </tr>
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export interface YearsObject {
    years: Year[];
}

export interface Year {
    co2:          number;
    methane:      number;
    nitrous_oxide: number;
    polar_ice:     number;
    sea_level:     number;
    temp_anomaly:  number;
    year_id:       number;
    year_name:     string;
}

export default YearInstance;
