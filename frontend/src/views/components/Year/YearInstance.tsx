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
import YearMap from '../Map/YearMap';

/* add in a get request for the 10 countries corresponding to this year*/

const START_INDEX = 2077 - 139 * 10;
const FIRST_YEAR = 1880;

const YearInstance = (name: any) => {

  const [year, setYear] = React.useState<Year>();
    
  // gets data from API
  const getData = () => {
    console.log("name= " + name.name);
    axios.get("/api/years/name="+name.name)
    .then((response)=>{
      setYear(JSON.parse(JSON.stringify(response.data)) as Year);
      console.log("year should be" + JSON.stringify(year));
    })
    .catch((error) => {
        console.log(error);
    })
    console.log("year is " + JSON.stringify(year));
  };

  const [topCountries, setTopCountries] = React.useState<CountryEmissionsYear[]>([]);

  const getTopCountries = (yearName: string) => {
    axios.get("/api/country_emissions")
      .then((response) => {
        const tempArray: CountryEmissionsYear[] = JSON.parse(JSON.stringify(response.data.country_emissions_years)) as CountryEmissionsYear[]
        console.log("year = " + yearName);
        const starting_index = START_INDEX + 10 * (parseInt(yearName) - FIRST_YEAR);
        let copyArray: CountryEmissionsYear[] = [];
        let i;
        console.log(starting_index);
        for (i = starting_index; i < starting_index + 10; i++) {
          copyArray.push(tempArray[i]);
        }
        
        setTopCountries(old => {
          return [...copyArray]
        });
    })
    .catch((error) => {
        console.log(error);
    })
    console.log("TOP COUNTRIES IN METHOD" + JSON.stringify(topCountries))
  };
  

  getData();
  console.log("year name= " + year?.year_name!);
  //getTopCountries(year?.year_name!);
  console.log("TOP COUNTRIES" + JSON.stringify(topCountries));
  return (
    <div className="YearInstance">
      <Navbar />
      <header className="App-header">
        {/*YearMap(topCountries)*/}
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

export interface CountryEmissionsYearObject {
  country_emissions_years: CountryEmissionsYear[];
}

export interface CountryEmissionsYear {
  code:        string;
  country:     string;
  country_co2: number;
  year_id:     number;
  year_name:   string;
}

export default YearInstance;
