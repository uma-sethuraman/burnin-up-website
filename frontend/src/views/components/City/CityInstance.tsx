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

  let [city, setCity] = React.useState<City>();
  let [cityYear, setCityYear] = React.useState<CityYear>();
    
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
  //let flagLink = "https://flagcdn.com/h240/" + (country?.country_iso2code)?.toLowerCase() + ".png";
  
  return (
    <div className="CountryInstance">
      <Navbar />
      <header className="App-header">
      {/*OurMap(country?.country_lat!, country?.country_long!, country?.country_name!)*/}
        {OurMap(Number(city?.lat! === undefined ? 0: Number(city?.lat!)), Number(city?.long! === undefined ? 0: Number(city?.long!)), "Aruba")}
        {/*<Image src={flagLink} alt="Flag" />*/}
        {LocationPhoto(encodeURI(city?.city_name!))}
        <header className="Country-header">
          <div className="image-text">
            <h3> {city?.city_name} </h3>
          </div>
          <div className="row">
            <h2> Year with the highest temperature:</h2>
          <Link to={"/years/name="+cityYear?.year}>
            { cityYear?.year}
          </Link>
          </div>
        </header>
        <br />
        <Table bordered hover size="sm" variant="dark">
          <tbody>
            <tr>
              <td>Country iso2 Code</td>
              <td>{city?.country_iso2code}</td>
            </tr>
            <tr>
              <td>Elevation</td>
              <td>{city?.elevation}</td>
            </tr>
            <tr>
              <td>O3</td>
              <td>{city?.o3}</td>
            </tr>
            <tr>
              <td>PM10</td>
              <td>{city?.pm10}</td>
            </tr>
            <tr>
              <td>PM2.5</td>
              <td>{city?.pm25}</td>
            </tr>
            <tr>
              <td>Population</td>
              <td>{city?.population}</td></tr>
            <tr>
              <td>Time Zone</td>
              <td>{city?.time_zone}</td>
            </tr>
              
          </tbody>
        </Table>
  
        <div>See more: </div>
        {OurCarousel(s1, s2, s3)}
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


export default CityInstance;
