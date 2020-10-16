import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import ImageBackground from "react";
import View from "react";
import "./CityInstance.css";
import Carousel from "react-bootstrap/Carousel";
import OurCarousel from "../OurCarousel";
import Slide from "../../../Slide";


function CityInstance() {
  let s1 = new Slide(
    "Austin",
    require("../../../assets/austin-capitol.jpg"),
    "cities/Austin"
  );
  let s2 = new Slide(
    "Beijing",
    require("../../../assets/beijing-skyline.jpg"),
    "cities/Beijing"
  );
  let s3 = new Slide(
    "Paris",
    require("../../../assets/paris-skyline.jpg"),
    "cities/Paris"
  );
  return (
    <div className="CityInstance">
      <Navbar />
      <header className="App-header">
        <h1>
          Austin, Texas,
          <Link to="/countries/USA"> United States</Link>
        </h1>
        <header className="City-header">
          <div className="image-text">
            <h3> AUSTIN</h3>
          </div>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Population: </td>
              <td>964,254</td>
            </tr>
            <tr>
              <td>Time Zone: </td>
              <td>Central Daylight Time (GMT -5)</td>
            </tr>
            <tr>
              <td>Elevation: </td>
              <td>425ft</td>
            </tr>
            <tr>
              <td>Latitude: </td>
              <td>39.9042</td>
            </tr>
            <tr>
              <td>Longitude: </td>
              <td>116.4074</td>
            </tr>
            <tr>
              <td>Fire Hazard Index: </td>
              <td>5.375</td>
            </tr>
            <tr>
              <td>Air Quality Index per US EPA Standard: </td>
              <td>41.3125</td>
            </tr>
            <tr>
              <td>Particulate Matter: </td>
              <td>13.3125 μg/m3</td>
            </tr>
            <tr>
              <td>Ozone: </td>
              <td>1.1875 ppb</td>
            </tr>
            <tr>
              <td>Nitrogen Dioxide: </td>
              <td>19.0625 ppb</td>
            </tr>
            <tr>
              <td>Carbon Monoxide: </td>
              <td>5.1875 ppm</td>
            </tr>
            <tr>
              <td>Sulfur Dioxide: </td>
              <td>5.875 ppb</td>
            </tr>
            <tr>
              <td>Health Concern Level Based On EPA Standard: </td>
              <td>Good</td>
            </tr>
            <tr>
              <td>ClimaCell Pollen Index for Trees: </td>
              <td>0 Climacell Pollen Index</td>
            </tr>
            <tr>
              <td>ClimaCell Pollen Index for Weeds: </td>
              <td>0 Climacell Pollen Index</td>
            </tr>
            <tr>
              <td>ClimaCell Pollen Index for Grass: </td>
              <td>0 Climacell Pollen Index</td>
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
          <Link to="/cities/beijing">Beijing</Link>
        </p>
        <p>
          <Link to="/cities/paris">Paris</Link>
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

export default CityInstance;
