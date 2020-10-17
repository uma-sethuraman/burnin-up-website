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


const CountryInstance = (id: any) => {

  let [country, setCountry] = React.useState<Country>();
    
  // gets data from API
  const getData = () => {
    axios.get("/api/countries/id="+id.id)
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
    require("../../../assets/China_flag.jpg"),
    "/countries/id=50"
  );
  let s2 = new Slide(
    "France",
    require("../../../assets/France_flag.jpg"),
    "/countries/id=405"
  );
  let s3 = new Slide(
    "India",
    require("../../../assets/USA_flag.jpg"),
    "/countries/id=439"
  );

  getData();
  let flagLink = "https://flagcdn.com/h240/" + (country?.country_iso2code)?.toLowerCase() + ".png";
  
  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
        {OurMap(country?.country_lat!, country?.country_long!, country?.country_name!)}
        <Image src={flagLink} alt="Flag"/>
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
  country_lat:          number;
  country_long:         number;
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