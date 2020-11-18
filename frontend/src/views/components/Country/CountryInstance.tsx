import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import "./CountryInstance.css";
import OurMap from "../Map/OurMap";
import { useEffect } from "react";
import useAxios from "axios-hooks";
import Image from "react-bootstrap/Image";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import Spinner from "react-bootstrap/Spinner";
import WebFont from "webfontloader";

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
    "https://flagcdn.com/h120/" +
    country?.country_iso2code?.toLowerCase() +
    ".png";

    WebFont.load({
      google: {
        families: [
          "serif",
          "Staatliches",
          "sans-serif",
          "Raleway",
        ],
      },
    });
    return (
      <div className="CountryInstance">
        <Navbar />
  
        {/* show spinner if content is loading */}
        { loading ? (<Spinner animation="border" color="black"/>) : (
          
          <div className="row">
          <div className="column1">
            <header className="Country-header">
              
              <div>
                <LocationPhoto name={(encodeURI(country?.country_name!))} />
                <br/>

                <div className="info-style">
                  {(country?.highest_emission !== (undefined || -1)) ? 
                  country?.highest_emission.toFixed(2) : "-"
                  }
                </div>
                <div className="info-title-style">
                  Highest Annual CO2 Emissions (ppm)
                </div>
              
                <br/>
  
                <div className="info-style">
                {country?.high_year !== undefined ? (
                  <Link to={"/years/id=" + country?.high_year}>
                    {country?.high_year} </Link>) : (
                  <Link to={"/years/id=2018"}>2018</Link>)}
                </div>
                <div className="info-title-style">
                  Year of Highest Annual CO2 Emissions
                </div>
                
                <br/>

                <div className="info-style">
                  {(country?.recent_emissions !== -1) ? 
                  country?.recent_emissions.toFixed(2) : "-"
                  }
                </div>
                <div className="info-title-style">
                  Most Recent CO2 Emissions (ppm)
                </div>

                <br />
  
                <div className="info-style">
                    {country?.country_population !== -1 ? 
                    (country?.country_population) : "-"}
                </div>
                <div className="info-title-style">
                  Population
                </div>
                <br />
              <div className="row-style">
                <div className="row">
                  <div className="subcolumn">
                    <div className="info-style">
                    {country?.lat! === -1 ? 0 : country?.lat!}
                    </div>
                    <div className="info-title-style">
                      Latitude
                    </div>
                  </div>
                  <div className="subcolumn">
                    <div className="info-style">
                      {country?.long! === -1 ? 0 : country?.long!}
                    </div>
                    <div className="info-title-style">
                      Longitude
                    </div>
                  </div>
                </div>
              </div>
              <br />
              </div>
            </header> 
          </div>  
          
          <div className="line">
            <Image src={require("../../../assets/line-shadow.png")} height="100%"></Image>
          </div>
                  
          <div className="column2">
            <header className="City-header">
               <div className="title">
                <h3> {country?.country_name!} </h3>
              </div>
              {/* <AiOutlineLine size="500px"/> */}

              {/* displays country flag */}
              <Image src={flagLink} alt="Flag" />
              <br/>

              <div className="info-style">
                <Link to={"/cities/id=" + country?.capital_city_id}>
                    {country?.country_capital_city}
                </Link> 
              </div>
              <div className="info-title-style">Capital City</div>
              <br/>
              <div className="info-style">
                      {country?.country_region + " "}
                    </div>
                    <div className="info-title-style">Region </div>
              <br/>
              <div className="info-style"> {country?.income_level}
              </div>
              <div className="info-title-style">Income Level</div>
                     
              <OurMap
              latitude = {country?.lat! === -1 ? 0 : country?.lat!}
              longitude = {country?.long! === -1 ? 0 : country?.long!}
              locationName = {country?.country_name!}
              map_style = {{height: '75vh', width: '90vh', margin:'10vh'}}
              />
    
            </header>
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
