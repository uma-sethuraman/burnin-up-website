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


function CountryInstance() {
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

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/api/country').then(response =>
        response.json().then(data => {
            setCountries(data);
        })
    );
  },[]);
  console.log(countries);

  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
        <h1>
          United States
        </h1>
        <header className="Country-header">
          <div className="image-text">
            <h3> United States </h3>
          </div>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Income Level</td>
              <td>High income</td>
            </tr>
            <tr>
              <td>Longtitude</td>
              <td>-77.032</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>38.8895</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>North America</td>
            </tr>
            <tr>
              <td>Capital City</td>
              <td>Washington D.C</td>
            </tr>
            <tr>
              <td>Average Temperature</td>
              <td>4.45</td>
            </tr>
            <tr>
              <td>pm2.5</td>
              <td>-4.2</td>
            </tr>
          </tbody>
        </Table>
        {/* <Image src={require("../assets/austin-capitol.jpg")} fluid />
        <br />
        <Image src={require("../assets/austin-location-map.jpg")} fluid />
        <br />
        <Image src={require("../assets/austin-OzoneGraph.jpg")} fluid /> */}

        <div>See more: </div>
        <p>
          <Link to="/countries/China">China</Link>
        </p>
        <p>
          <Link to="/countries/France">France</Link>
        </p>
        {OurCarousel(s1, s2, s3)}
        {/* <OurCarousel
          slide1 = {s1}
          slide2 = {s2}
          slide3 ={s3}
        ></OurCarousel> */}
      </header>
    </div>
  );
}

export default CountryInstance;