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
import Slide from "../Slide";
import { useState, useEffect } from 'react';
import axios from "axios";
import Image from "react-bootstrap/Image";
import YearMap from '../Map/YearMap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label} from 'recharts';

/* add in a get request for the 10 countries corresponding to this year*/

const START_INDEX = 2077 - 139 * 10;
const FIRST_YEAR = 1880;

const YearInstance = (name: any) => {

  const [year, setYear] = React.useState<Year>();
    
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

  const [topCountries, setTopCountries] = React.useState<CountryEmissionsYear[]>([]);

  const getTopCountries = (yearName: string) => {
    axios.get("/api/country_emissions")
      .then((response) => {
        const tempArray: CountryEmissionsYear[] = JSON.parse(JSON.stringify(response.data.country_emissions_years)) as CountryEmissionsYear[];
        const starting_index = START_INDEX + 10 * (parseInt(yearName) - FIRST_YEAR);
        let copyArray: CountryEmissionsYear[] = [];
        let i;
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
  };

  const [topCities, setTopCities] = React.useState<CityTemperaturesYear[]>([]);

  const getTopCities = (yearName: string) => {
    axios.get("/api/city_temperatures")
    .then((response) => {
      const tempArray: CityTemperaturesYear[] = JSON.parse(JSON.stringify(response.data.city_temperatures_years)) as CityTemperaturesYear[];
      const starting_index = 10 * (parseInt(yearName) - FIRST_YEAR);
      let copyArray: CityTemperaturesYear[] = [];
      let i;
      for (i = starting_index; i < starting_index + 10; i++) {
        copyArray.push(tempArray[i]);
      }
      
      setTopCities(old => {
        return [...copyArray]
      });
    })
    .catch((error) => {
        console.log(error);
    })
  };
  

  getData();
  getTopCountries(year?.year_name!);
  getTopCities(year?.year_name!);


  return (
    <div className="YearInstance">
      <Navbar />
      <header className="App-header">
        <h3> {year?.year_name} </h3>
        <br />
        <h1>Top 10 Countries with Highest CO2 Emissions This Year</h1>
        <div className = "side-by-side">
          <BarChart width={1000} height={500} data={topCountries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" stroke="#FFFFFF" tick={{fontSize: 12}} interval = {0}/>
            <YAxis stroke="#FFFFFF"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="country_co2" fill="#8884d8" name = "CO2 Level (ppm)"/>
          </BarChart>
          <Table bordered hover size="sm">
            {topCountries.map(topCountry => (
              <tr>
                  <td>
                    {topCountry.countryid !== null?
                      <Link to={"/countries/id="+topCountry.countryid}>{topCountry.country}</Link>:
                      <Link to={"/countries"}>{topCountry.country}</Link>
                    }
                  </td>
              </tr>
          ))}
          </Table>
        </div>
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
        <br />
        <h1> Top 10 Cities with Highest Average Temperatures This Year</h1>
        <Table bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>City</th>
                <th>Highest Temperature</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map(city => (
                <tr>
                  <td>
                    <Link to={"/cities/id="+city.city_id}>
                      {city.city}
                    </Link>
                  </td>
                  <td>
                      {city.city_temp + (city.city_temp > 40 ? " °F": " °C")}
                  </td>
                </tr>
              ))}
            </tbody>
        </Table>
        {YearMap(topCities)}
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
  countryid: number;
  year_id:     number;
  year_name:   string;
}

export interface CityTempsObject {
  city_temperatures_years: CityTemperaturesYear[];
}

export interface CityTemperaturesYear {
  city:     string;
  city_id: string;
  city_temp: number;
  country:  Country;
  lat:      number;
  long:     number;
  year_id:   number;
  year_name: number;
}

export enum Country {
  Bahrain = "Bahrain",
  Benin = "Benin",
  Brazil = "Brazil",
  BurkinaFaso = "Burkina Faso",
  Cameroon = "Cameroon",
  Colombia = "Colombia",
  Djibouti = "Djibouti",
  Ecuador = "Ecuador",
  Haiti = "Haiti",
  India = "India",
  Indonesia = "Indonesia",
  IvoryCoast = "Ivory Coast",
  Malaysia = "Malaysia",
  Mali = "Mali",
  Nicaragua = "Nicaragua",
  Niger = "Niger",
  Nigeria = "Nigeria",
  Philippines = "Philippines",
  Qatar = "Qatar",
  SaudiArabia = "Saudi Arabia",
  Senegal = "Senegal",
  Singapore = "Singapore",
  SriLanka = "Sri Lanka",
  Sudan = "Sudan",
  Togo = "Togo",
  UnitedArabEmirates = "United Arab Emirates",
  Venezuela = "Venezuela",
}

export default YearInstance;
