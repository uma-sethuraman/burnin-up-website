import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import "./CountryInstance.css";
import { useEffect } from "react";
import useAxios from "axios-hooks";
import Image from "react-bootstrap/Image";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import WebFont from "webfontloader";
import LoadingSpinner from "../LoadingSpinner";
import CountryColumn from "./CountryColumn";
import CountryInstanceInfo from "./CountryInstanceInfo";

/* country instance page, takes in country id,
   route: "/countries/id=" */
const CountryInstance = (id: any) => {
  /* stores all information about current country */
  const [country, setCountry] = React.useState<Country>();

  /* gets this country's data from our backend */
  const [{ data, loading, error }] = useAxios("/api/countries/id=" + id.id);

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

  WebFont.load({
    google: {
      families: ["serif", "Staatliches", "sans-serif", "Raleway"],
    },
  });
  return (
    <div className="CountryInstance">
      <Navbar singleColor={true} />
      {/* show spinner if content is loading */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <div className="column1">
            <header className="Country-header">
              <div>
                <LocationPhoto name={encodeURI(country?.country_name!)} />
                <br />
                <div className="info-style">
                  {country?.country_population !== -1
                    ? country?.country_population
                    : "-"}
                </div>
                <div className="info-title-style">Population</div>
                <br />
                <div className="info-style">
                  {country?.recent_emissions !== -1
                    ? country?.recent_emissions.toFixed(2)
                    : "-"}
                </div>
                <div className="info-title-style">
                  Most Recent CO2 Emissions
                </div>
                <div className="info-unit-style">ppm</div>
                <br />
                <div className="info-style">
                  {country?.high_year !== undefined ? (
                    <div>
                      <Link to={"/years/id=" + country?.high_year}>
                        <u>{country?.high_year}</u>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link to={"/years/id=2018"}>
                        <u>2018</u>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="info-title-style">
                  Year of Highest Annual CO2 Emissions
                </div>
                <br />
                <CountryInstanceInfo {...country!}></CountryInstanceInfo>
              </div>
            </header>
          </div>
          <div className="line">
            <Image
              src={require("../../../assets/line-shadow.png")}
              height="100%"
            ></Image>
          </div>
          <div className="column2">
            <CountryColumn {...country!}></CountryColumn>
          </div>
        </div>
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
