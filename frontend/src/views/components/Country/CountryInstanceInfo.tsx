import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import "./CountryInstance.css";
import Image from "react-bootstrap/Image";
import cloud from "../../../assets/cloud-grey.png";
import { Country } from "./CountryInstance";

/* shows emissions data and latitude
and longitude for a country instance page */
const CountryInstanceInfo = (country: Country) => {
  return (
    <div>
      <div className="row">
        <div>
          {/* display highest emissions data */}
          <div className="info-style">
            <div className="container">
              <div className="centered">
                {country?.highest_emission !== undefined &&
                country?.highest_emission !== -1
                  ? country?.highest_emission.toFixed(2)
                  : "-"}
              </div>
              {/* display clickable cloud */}
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
      {/* display latitude and longitude */}
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

export default CountryInstanceInfo;
