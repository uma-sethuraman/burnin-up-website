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
import CityPosts from "../CityPosts";
import axios from "axios";
import OurMap from "../Map/OurMap";
import LocationPhoto from "../LandingPhoto/LandingPhoto";


const CityInstance = (id: any) => {

  const [city, setCity] = React.useState<City>();
  const [cityYear, setCityYear] = React.useState<CityYear>();
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
    axios.get("/api/city_year/name="+city?.city_name)
    .then((response)=>{
        setCityYear(JSON.parse(JSON.stringify(response.data)) as CityYear);
    })
    .catch((error) => {
        console.log(error);
    })
    axios.get("/api/"+city?.city_id+"/country_code")
    .then((response)=>{
      const responseData: CountryCode = JSON.parse(JSON.stringify(response.data.country_code)) as CountryCode;
      setCountryName(responseData.name);
      setCountryID(responseData.id);
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
                <Link to={"/countries/id="+countryID}>
                  {countryName}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Country ISO2 Code</td>
              <td>{city?.country_iso2code}</td>
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
            {cityYear?.temp !== undefined?
            <tr>
              <td>Highest Annual Temp</td>
              <td>{cityYear?.temp + (cityYear?.temp! > 40 ? " °F": " °C") }</td>
            </tr> : null}
            {cityYear?.year !== undefined?
            <tr>
              <td>Year of Highest Annual Temp</td>
              <td><Link to={"/years/name="+cityYear?.year}>
              { cityYear?.year}
              </Link></td>
            </tr>: 
            <tr>
            <td>Year of Highest Annual Temp</td>
            <td><Link to={"/years/name="+2018}>
              {2018}
            </Link></td>
            </tr>}
            <tr>
              <td>Population</td>
              {city?.population !== 0? 
              <td>{city?.population}</td> : <td>-</td>}
            </tr>
          </tbody>
        </Table>
  
        {OurMap(Number(city?.lat! === undefined ? 0: Number(city?.lat!)), Number(city?.long! === undefined ? 0: Number(city?.long!)), city?.city_name!)}
      </header>
    </div>
  );
}

export interface CityObject {
  cities: City[];
}

export interface City {
  city_id:          number;
  city_name:        string;
  co:               null;
  country_iso2code: string;
  elevation:        number;
  lat:              number;
  long:             number;
  o3:               number;
  pm10:             number;
  pm25:             number;
  population:       number;
  time_zone:        string;
}

export interface CityYear {
  city:    string;
  temp:    number;
  year:    number;
  year_id: number;
}

export interface CountryIdentification {
  country_code: CountryCode;
}

export interface CountryCode {
  id:   number;
  name: string;
}

export default CityInstance;
