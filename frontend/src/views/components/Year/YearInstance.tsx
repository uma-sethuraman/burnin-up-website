import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import "./YearInstance.css";
import { useEffect } from 'react';
import YearMap from '../Map/YearMap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend} from 'recharts';
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";

const YearInstance = (id: any) => {

  const [year, setYear] = React.useState<Year>();

  const [{ data, loading, error }, refetch] = useAxios('/api/years/id='+id.id);

  if (error || id.id === undefined) {
    window.location.assign("/404");
  }

  useEffect(() => {
    const yearData: Year = data as Year;
    if (yearData) {
      setYear(yearData);
    }
  }, [data]);

  function barClick(currCountry: any) {
    window.location.assign("/countries/id=" + currCountry.country_id);
  }

  return (
    <div className="YearInstance">
      <Navbar />
      {loading? <Spinner animation="border" />: <header className="App-header">
        <h3> {year?.year_id} </h3>
        <br />
        <h1>Top 10 Countries with Highest CO2 Emissions This Year</h1>
        <p>Click on a bar to learn more about that country!</p>
          <BarChart width={1200} height={500} data={year?.countries_emissions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" stroke="#FFFFFF" tick={{fontSize: 12}} interval = {0}/>
            <YAxis stroke="#FFFFFF"/>
            <Tooltip />
            <Legend wrapperStyle={{bottom: -30}}/>
            <Bar dataKey="country_co2" fill="#8884d8" name = "CO2 Level (ppm)" onClick={barClick}/>
          </BarChart>
        <br />
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
        <p>Explore the map and click on a marker to learn more about a city!</p>
        <Table bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>City</th>
                <th>Highest Temperature</th>
              </tr>
            </thead>
            <tbody>
              {year?.city_temperatures.map(city => (
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
        {YearMap((year?.city_temperatures !== undefined)? (year?.city_temperatures): [])}
      </header>}
    </div>
  );
}

export interface YearsObject {
  years: Year[];
}

export interface Year {
  city_temperatures:   CityTemperature[];
  co2:                number;
  countries_emissions: CountriesEmission[];
  methane:            number;
  nitrous_oxide:       number;
  polar_ice:           number;
  sea_level:           number;
  temp_anomaly:        number;
  world_population:    number;
  year_id:             number;
}

export interface CityTemperature {
  city:         string;
  city_id:       number;
  city_temp:     number;
  country:      Country;
  latitude:     number;
  longitude:    number;
  parent_year_id: number;
  year_id:       number;
  year_name:     number;
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

export interface CountriesEmission {
  code:         string;
  country:      string;
  country_co2:   number;
  country_id:    number;
  parent_year_id: number;
  year_id:       number;
  year_name:     string;
}

export default YearInstance;
