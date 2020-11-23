import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import "./CountryInstance.css";
import Image from "react-bootstrap/Image";
import cloud from "../../../assets/cloud-grey.png";

const CountryInstanceInfo = (country: Country) => {
  return (
    <div>
      <div className="row">
        <div>
          <div className="info-style">
            <div className="container">
              <div className="centered">
                {country?.highest_emission !== undefined &&
                country?.highest_emission !== -1
                  ? country?.highest_emission.toFixed(2)
                  : "-"}
              </div>
              {country?.high_year === undefined || country?.high_year === -1 ? (
                <Link to={"/years/id=2018"}>
                  <Image
                    src={cloud}
                    style={{ maxWidth: "24vw", paddingBottom: "2vh" }}
                  ></Image>
                </Link>
              ) : (
                <Link to={"/years/id=" + country?.high_year}>
                  <Image
                    src={cloud}
                    style={{ maxWidth: "24vw", paddingBottom: "2vh" }}
                  ></Image>
                </Link>
              )}
            </div>
          </div>
          <div className="info-title-style">Highest Annual CO2 Emissions</div>
          <div className="info-unit-style">ppm</div>
        </div>
        <div
          className="info-unit-style"
          style={{ fontSize: "20px", marginTop: "2vh" }}
        >
          Click on the cloud to view the year with highest emissions!
        </div>
        <br />
      </div>
      <div className="row-style">
        <div className="row">
          <div className="col-sm-6">
            <div className="info-style">
              {country?.lat! === -1 ? 0 : country?.lat!}
            </div>
            <div className="info-title-style">Latitude</div>
          </div>
          <div className="col-sm-6">
            <div className="info-style">
              {country?.long! === -1 ? 0 : country?.long!}
            </div>
            <div className="info-title-style">Longitude</div>
          </div>
        </div>
      </div>
      <br />
      <br />
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

export default CountryInstanceInfo;
