import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import ImageBackground from "react";
import View from "react";
import "./CountryInstance.css";
import Carousel from "react-bootstrap/Carousel";
import OurCarousel from "../OurCarousel";
import Slide from "../../../Slide";
import { useState, useEffect } from 'react';
import axios from "axios";


const CountryInstance = (name: any) => {

  let [country, setCountry] = React.useState<Country>()
    
  // gets data from API
  const getData = () => {
    axios.get("/api/countries/name="+name.name)
    .then((response)=>{
        setCountry(JSON.parse(JSON.stringify(response.data)) as Country);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  // initializing carousel slides
  let s1 = new Slide(
    "China",
    require("../../../assets/China_flag.jpg")
  );
  let s2 = new Slide(
    "France",
    require("../../../assets/France_flag.jpg")
  );
  let s3 = new Slide(
    "USA",
    require("../../../assets/USA_flag.jpg")
  );

  getData();
  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
        <h1>
          {country?.country_name}
        </h1>
        <header className="Country-header">
          <div className="image-text">
            <h3> {country?.country_name} </h3>
          </div>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>{country?.country_income}</td>
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
  
        <div>See more: </div>
        <p>
          <Link to="/countries/China">China</Link>
        </p>
        <p>
          <Link to="/countries/France">France</Link>
        </p>
        {OurCarousel(s1, s2, s3)}
      </header>
    </div>
  );
}

export interface CountriesObject {
  countries: Country[];
}

export interface Country {
  country_capital_city: string;
  country_id:           number;
  country_income:       CountryIncome;
  country_iso2code:     string;
  country_iso3code:     string;
  country_name:         string;
  country_region:       CountryRegion;
}

export enum CountryIncome {
  Aggregates = "Aggregates",
  HighIncome = "High income",
  LowIncome = "Low income",
  LowerMiddleIncome = "Lower middle income",
  UpperMiddleIncome = "Upper middle income",
}

export enum CountryRegion {
  Aggregates = "Aggregates",
  EastAsiaPacific = "East Asia & Pacific",
  EuropeCentralAsia = "Europe & Central Asia",
  LatinAmericaCaribbean = "Latin America & Caribbean ",
  MiddleEastNorthAfrica = "Middle East & North Africa",
  NorthAmerica = "North America",
  SouthAsia = "South Asia",
  SubSaharanAfrica = "Sub-Saharan Africa ",
}

export default CountryInstance;