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
import Slide from "../Slide";
import axios from "axios";
import OurMap from "../Map/OurMap";
import LocationPhoto from "../LandingPhoto/LandingPhoto";


const CityInstance = (id: any) => {

  const [city, setCity] = React.useState<City>();
  const [countryName, setCountryName] = React.useState("");
  const [countryID, setCountryID] = React.useState(0);

  // gets data from API
  const getData = () => {
    axios.get("/api/cities/id="+id.id)
    .then((response)=>{
        setCity(JSON.parse(JSON.stringify(response.data)) as City);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  getData();
  
  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
      <div className="image-text">
        <h3> {city?.city_name} </h3>
        </div> 
        <div className="image_holder">
        {LocationPhoto(encodeURI(city?.city_name!))}
        </div>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Country</td>
              <td>
                <Link to={"/countries/id="+city?.country?.country_id}>
                  {city?.country.country_name}
                </Link>
              </td>
            </tr>
            <tr>
              <td>O3 (Dobson Units)</td>
              <td>{city?.o3 + " "}</td>
            </tr>
            <tr>
              <td>PM10 (ug/m3)</td>
              <td>{city?.pm10 + " "}</td>
            </tr>
            <tr>
              <td>PM2.5 (ug/m3)</td>
              <td>{city?.pm25 + " "}</td>
            </tr>
            <tr>
              <td>Highest Annual Temp</td>
              {city?.highest_temp !== undefined?
              <td>{city?.highest_temp + (city?.highest_temp! > 40 ? " °F": " °C") }</td> : <td>-</td> }
            </tr>
            <tr>
              <td>Year of Highest Annual Temp</td>
              {city?.year_highest !== undefined?
              <td><Link to={"/years/name="+city?.year_highest}>{city?.year_highest}</Link></td>:
              <td><Link to={"/years/name=2018"}>2018</Link></td>}
            </tr>
            <tr>
              <td>Population</td>
              {city?.population !== 0? 
              <td>{city?.population}</td> : <td>-</td>}
            </tr>
          </tbody>
        </Table>
  
        {/*OurMap(Number(city?.lat! === undefined ? 0: Number(city?.lat!)), Number(city?.long! === undefined ? 0: Number(city?.long!)), city?.city_name!)*/}
      </header>
    </div>
  );
}

export interface CityObject {
  cities: City[];
}


export interface City {
  city_id:      number;
  city_name:    string;
  country:      Country;
  highest_temp: number;
  o3:           number;
  pm10:         number;
  pm25:         number;
  population:   number;
  year_highest: number;
  
}

export interface Country {
  country_id:   number;
  country_name: string;
}


export interface CountryIdentification {
  country_code: CountryCode;
}

export interface CountryCode {
  id:   number;
  name: string;
}

export default CityInstance;
