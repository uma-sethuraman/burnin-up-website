import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Table from "react-bootstrap/Table";
import "./CountryInstance.css";
import OurMap from "../Map/OurMap";
import { useEffect } from "react";
import useAxios from "axios-hooks";
import Image from "react-bootstrap/Image";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import Spinner from "react-bootstrap/Spinner";

/* country instance page, takes in country id,
   route: "/countries/id=" */
const CountryInstance = (id: any) => {

  /* stores all information about current country */
  const [country, setCountry] = React.useState<Country>();

  /* gets this country's data from our backend */
  const [{ data, loading, error }] = useAxios(
    "/api/countries/id=" + id.id
  );

  /* if there is an error in the request or id is invalid, 
  go to the invalid page */
  if (error || id.id === undefined) {
    window.location.assign("/404");
  }

  /* set the country variable after getting data */
  useEffect(() => {
    const countryObj: Country = data as Country;
    if (countryObj) {
      setCountry(countryObj);
    }
  }, [data]);

  /* link for this country's flag from the flag API */
  let flagLink =
    "https://flagcdn.com/h240/" +
    country?.country_iso2code?.toLowerCase() +
    ".png";

  return (
    <div className="CountryInstance">
      <Navbar />

      {/* display loading animation if data is still loading */}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <header className="App-header">

          {/* display country name */}
          <h3> {country?.country_name} </h3>
          <div className="row">
            <div className="column">

              {/* displays image of country */}
              <div className="image_holder">
                <LocationPhoto name={(encodeURI(country?.country_name!))} />
              </div>
            </div>
            <div className="column">

              {/* displays country flag */}
              <div className="image_holder">
                <Image src={flagLink} alt="Flag" />
              </div>
            </div>
          </div>
          <br />

          {/* display all data/attributes about this country */}
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
                {country?.capital_city_id !== 0 ? (
                  <td>
                    <Link to={"/cities/id=" + country?.capital_city_id}>
                      {country?.country_capital_city}
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Link to={"/cities"}>{country?.country_capital_city}</Link>
                  </td>
                )}
              </tr>
              <tr>
                <td>Population</td>
                <td>{country?.country_population}</td>
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
                {country?.highest_emission !== undefined ? (
                  <td>{country?.highest_emission}</td>
                ) : (
                  <td>-</td>
                )}
              </tr>
              <tr>
                <td>Year of Highest Annual CO2 Emissions</td>
                {country?.high_year !== undefined ? (
                  <td>
                    <Link to={"/years/id=" + country?.high_year}>
                      {" "}
                      {country?.high_year}{" "}
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Link to={"/years/id=2018"}>2018</Link>
                  </td>
                )}
              </tr>
              <tr>
                <td>Most Recent CO2 Emissions (ppm)</td>
                {country?.high_year !== -1 ? (
                  <td>{country?.recent_emissions}</td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            </tbody>
          </Table>

          {/* display world map with country plotted as a marker */}
          <OurMap
            latitude = {country?.lat! === undefined ? 0 : country?.lat!}
            longitude = {country?.long! === undefined ? 0 : country?.long!}
            locationName = {country?.country_name!}
          />
        </header>
      )}
    </div>
  );
};

/* interfaces needed for country data */

export interface CountriesObject {
  countries: Country[];
}

export interface Country {
  capital_city_id: number;
  country_capital_city: string;
  country_id: number;
  country_iso2code: string;
  country_iso3code: string;
  country_name: string;
  country_population: number;
  country_region: CountryRegion;
  high_year: number;
  highest_emission: number;
  income_level: IncomeLevel;
  lat: number;
  long: number;
  recent_emissions: number;
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
