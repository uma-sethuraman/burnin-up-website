import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import "./CountryInstance.css";
import OurMap from "../Map/OurMap";
import Image from "react-bootstrap/Image";

const CountryColumn = (country: Country) => {
  let flagLink =
    "https://flagcdn.com/h120/" +
    country?.country_iso2code?.toLowerCase() +
    ".png";
  return (
    <header className="City-header">
      <div className="title">
        <h3> {country?.country_name!} </h3>
      </div>
      {/* displays country flag */}
      <Image src={flagLink} alt="Flag" />
      <br />
      <div className="info-style">{country?.country_region + " "}</div>
      <div className="info-title-style">Region </div>
      <br />
      <div className="info-style"> {country?.income_level}</div>
      <div className="info-title-style">Income Level</div>
      <br />
      <div className="info-style">
        <Link to={"/cities/id=" + country?.capital_city_id}>
          <u>{country?.country_capital_city}</u>
        </Link>
      </div>
      <div className="info-title-style">Capital City</div>
      <br />
      <br />
      <div className="info-title-style">
        Click on map marker to view capital city!
      </div>
      <OurMap
        latitude={country?.lat! === -1 ? 0 : country?.lat!}
        longitude={country?.long! === -1 ? 0 : country?.long!}
        locationName={country?.country_name!}
        map_style={{
          height: "75vh",
          width: "90vh",
          marginLeft: "10vh",
          marginRight: "10vh",
          marginBottom: "10vh",
        }}
        id={country?.capital_city_id}
        map_type="country"
      />
    </header>
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

export default CountryColumn;
