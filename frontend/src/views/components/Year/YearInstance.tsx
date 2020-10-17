import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import ImageBackground from "react";
import View from "react";
import "./CountryInstance.css";
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
        <OurMap></OurMap>
        {/* <Image src={flagLink} alt="Flag"/> */}
        <header className="Year-header">
          <div className="image-text">
            <h3> {year?.year_name} </h3>
          </div>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>{year?.yearName}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{country?.country_region}</td>
            </tr>
            <tr>
              <td>Capital City</td>
              <td>{country?.country_capital_city}</td>
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
    nitrousOxide: number;
    polarIce:     number;
    seaLevel:     number;
    tempAnomaly:  number;
    yearID:       number;
    yearName:     string;
}

export default YearInstance;
