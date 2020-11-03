import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import "./CityInstance.css";
import useAxios from "axios-hooks";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import OurMap from "../Map/OurMap";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

const CityInstance = (id: any) => {
  const [city, setCity] = React.useState<City>();
  /* fetch city data */
  const [{ data, loading, error }] = useAxios(
    "/api/cities/id=" + id.id
  );

  /* if id is undefined show our 404 page */
  if (error || id.id === undefined) {
    window.location.assign("/404");
  }

  /* set city data */
  useEffect(() => {
    const cityObj: City = data as City;
    if (cityObj) {
      setCity(cityObj);
    }
  }, [data]);

  return (
    <div className="CityInstance">
      <Navbar />
      {/* show spinner if content is loading */}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <header className="App-header">
          <div className="image-text">
            <h3> {city?.city_name} </h3>
          </div>

          {/* display image of the city */}
          <LocationPhoto name={(encodeURI(city?.city_name!))} />
          <br />
          {/* city table */}
          <Table bordered hover size="sm" variant="dark">
            <tbody>
              <tr>
                <td>Country</td>
                <td>
                  <Link to={"/countries/id=" + city?.country_id}>
                    {city?.country_name}
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
                {city?.highest_temp !== (undefined || -1) ? (
                  <td>
                    {city?.highest_temp +
                      (city?.highest_temp! > 40 ? " °F" : " °C")}
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
              <tr>
                <td>Year of Highest Annual Temp</td>
                {city?.year_highest !== (undefined || -1) ? (
                  <td>
                    <Link to={"/years/id=" + city?.year_highest}>
                      {city?.year_highest}
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Link to={"/years/id=2018"}>2018</Link>
                  </td>
                )}
              </tr>
              <tr>
                <td>Population</td>
                {city?.population !== 0 ? (
                  <td>{city?.population}</td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            </tbody>
          </Table>
          {/* map with city on it */}
          {OurMap(
            Number(city?.latitude! === undefined ? 0 : Number(city?.latitude!)),
            Number(
              city?.longitude! === undefined ? 0 : Number(city?.longitude!)
            ),
            city?.city_name!
          )}
        </header>
      )}
    </div>
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

export default CityInstance;
