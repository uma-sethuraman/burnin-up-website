import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import "./CountryInstance.css";
import Carousel from "react-bootstrap/Carousel";
import OurCarousel from "../OurCarousel";
import OurMap from "../Map/OurMap";
import Slide from "../Slide";
import { useState, useEffect } from 'react';
import axios from "axios";
import Image from "react-bootstrap/Image";
import LocationPhoto from "../LandingPhoto/LandingPhoto";
import { cpuUsage } from "process";


const CountryInstance = (id: any) => {

  const [country, setCountry] = React.useState<Country>();
  // gets data from API
  const getData = () => {
    axios.get("/api/countries/id=" + id.id)
      .then((response) => {
        setCountry(JSON.parse(JSON.stringify(response.data)) as Country);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  getData();
  let flagLink = "https://flagcdn.com/h240/" + (country?.country_iso2code)?.toLowerCase() + ".png";

  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
        <h3> {country?.country_name} </h3>
        <div className="row">
          <div className="column">
            <div className="image_holder">
              {LocationPhoto(encodeURI(country?.country_name!))}
            </div>
          </div>
          <div className="column">
            <div className="image_holder">
              <Image src={flagLink} alt="Flag" />
            </div>
          </div>
        </div>

        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>{country?.income_level}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{country?.country_region}</td>
            </tr>
            <tr>
              <td>Capital City</td>
              {country?.capital_city_id !== 0?
                <td><Link to={"/cities/id="+country?.capital_city_id}>{country?.country_capital_city}</Link></td>:
                <td><Link to={"/cities"}>{country?.country_capital_city}</Link></td>
              }
            </tr>
            <tr>
              <td>Latitude</td>
              <td>{country?.lat}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{country?.long}</td>
            </tr>
            <tr>
              <td>Highest Annual CO2 Emissions (ppm)</td>
              {country?.highest_emission !== undefined?
              <td>{country?.highest_emission}</td>: <td>-</td>}
            </tr>  
            <tr>
              <td>Year of Highest Annual CO2 Emissions</td>
              {country?.high_year !== undefined?
              <td><Link to={"/years/name=" + country?.high_year}> {country?.high_year} </Link></td>:
              <td><Link to={"/years/name=2018"}>2018</Link></td> }
            </tr>
            <tr>
              <td>Most Recent CO2 Emissions (ppm)</td>
              {country?.high_year !== -1?
              <td>{country?.recent_emissions}</td> : <td>-</td>}
            </tr>

          </tbody>
        </Table>
        {OurMap(country?.lat! === undefined ? 0 : country?.lat!, 
                country?.long! === undefined ? 0 : country?.long!, 
                country?.country_name!)}
      </header>
    </div>
  ); 
}


export interface CountriesObject {
  countries: Country[];
}

export interface Country {
  capital_city_id:      number;
  country_capital_city: string;
  country_id:           number;
  country_iso2code:     string;
  country_iso3code:     string;
  country_name:         string;
  country_population:   number;
  country_region:       CountryRegion;
  high_year:            number;
  highest_emission:     number;
  income_level:         IncomeLevel;
  lat:                  number;
  long:                 number;
  recent_emissions:     number;
}

export enum CountryRegion {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  EastAsiaPacific = "East Asia & Pacific",
  Europe = "Europe",
  LatinAmericaCaribbean = "Latin America & Caribbean ",
  Oceania = "Oceania",
}

export enum IncomeLevel {
  HighIncome = "High income",
  IncomeLevelHighIncome = "High Income",
  IncomeLevelUpperMiddleIncome = "Upper Middle Income",
  LowIncome = "Low income",
  LowerMiddleIncome = "Lower middle income",
  UpperMiddleIncome = "Upper middle income",
}


export default CountryInstance;