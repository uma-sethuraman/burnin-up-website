import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import "./CityInstance.css";
import useAxios from "axios-hooks";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import OurMap from "../Map/OurMap";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Image from "react-bootstrap/Image";
import { BsCalendar } from "react-icons/bs";
import LoadingSpinner from "../LoadingSpinner";

const CityInstanceTemp = (city: any) => {
  return (
    <header className="City-header">
      <div>
        <LocationPhoto name={encodeURI(city?.city_name!)} />
        <br />

        <div className="info-style">
          {city?.population !== -1 ? city?.population : "-"}
        </div>
        <div className="info-title-style">Population</div>
        <br />

        <div className="info-style">
          {city?.highest_temp !== (undefined || -1)
            ? city?.highest_temp.toFixed(2) +
              (city?.highest_temp! > 40 ? " °F" : " °C")
            : "-"}
        </div>
        <div className="info-title-style">Highest Annual Temperature</div>

        <br />
        <div className="info-style">
          {/* year information */}
          {city?.year_highest !== -1 || city?.year_highest === undefined ? (
            <div>
              <Link to={"/years/id=" + city?.year_highest}>
                <BsCalendar /> <u>{city?.year_highest}</u>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/years/id=2018"}>
                <BsCalendar /> <u>2018</u>
              </Link>
            </div>
          )}
        </div>
        <div className="info-title-style">
          Year of Highest Annual Temperature
        </div>

        <br />
      </div>
    </header>
  );
};

/* relevant interfaces for city and country data */

export interface CityObject {
  cities: City[];
}

export interface City {
  city_id: number;
  city_name: string;
  country_id: number;
  country_name: string;
  highest_temp: number;
  latitude: number;
  longitude: number;
  o3: number;
  pm10: number;
  pm25: number;
  population: number;
  year_highest: number;
}

export interface CountryIdentification {
  country_code: CountryCode;
}

export interface CountryCode {
  id: number;
  name: string;
}

export default CityInstanceTemp;
