import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import "./CountryInstance.css";
import OurMap from "../Map/OurMap";
import Image from "react-bootstrap/Image";
import { Country } from "./CountryInstance";

/* displays right column of country instance page */
const CountryRightColumn = (country: Country) => {
  /* country flag */
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
      {/* display country data */}
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
      {/* display country map */}
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

export default CountryRightColumn;
