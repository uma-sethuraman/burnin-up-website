import React from "react";
import Navbar from "../OurNavbar";
import "./YearInstance.css";
import { useEffect } from "react";
import YearMap from "../Map/YearMap";
import { BarChart, Bar, XAxis, YAxis, 
        Tooltip, CartesianGrid } from "recharts";
import useAxios from "axios-hooks";
import Image from "react-bootstrap/Image";
import YearInstanceTable from "./YearInstanceTable";
import WebFont from "webfontloader";
import LoadingSpinner from '../LoadingSpinner';

/* year instance page, takes in year id,
route: "/years/id=" */
const YearInstance = (id: any) => {
  /* loading fonts */
  WebFont.load({
    google: {
      families: [
        "Staatliches",
        "serif",
        "Raleway",
        "sans-serif",
      ],
    },
  });

  /* contains all data about current year */
  const [year, setYear] = React.useState<Year>();

  /* fetching year data */
  const [{ data, loading, error }] = useAxios(
    "/api/years/id=" + id.id
  );

  /* reroute to 404 if the page is invalid */
  if (error || id.id === undefined) {
    window.location.assign("/404");
  }

  /* set year data */
  useEffect(() => {
    const yearData: Year = data as Year;
    if (yearData) {
      setYear(yearData);
    }
  }, [data]);

  /* link to countries from bar graph */
  function barClick(currCountry: any) {
    window.location.assign("/countries/id=" + currCountry.country_id);
  }

  /* axis tick for countries graph */
  const CustomAxisTick = (props: any) => {
      const {x, y, payload} = props;
      
       return (
        <g transform={`translate(${x},${y})`}>
          <text 
            fontSize = {14}
            x={0}
            y={0}
            dy={16}
            textAnchor="end"
            fill="white"
            transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      );
  };

  /* attributes of year instance */
  const year_info = [
  {
    info: year?.temp_anomaly.toFixed(2),
    title: "Global Mean Surface",
    title2:"Temperature Anomaly"
  },
  {
    info: year?.co2.toFixed(2),
    title: "Mean Carbon Dioxide Level",
    unit: "ppm"
  },
  {
    info: year?.methane.toFixed(2),
    title: "Methane Level",
    unit: "ppb"
  },
  {
    info: year?.nitrous_oxide.toFixed(2),
    title: "Nitrous Oxide Level",
    unit: "ppb"
  },
  {
    info: year?.polar_ice.toFixed(2),
    title: "Ice Extent",
    unit: "km2"
  },
  {        
    info: year?.sea_level.toFixed(2),
    title: "Absolute Sea Level",
    title2: "Change Since 1880",
    unit: "inches"
  }
  ];
 
  return (
    <div className="YearInstance">
        <Navbar singleColor = {true} />
        {/* show spinner if content is loading */}
        { loading ? (<LoadingSpinner />) : (
        <div className="row">
          <div className="year-column1">
            <header className="Year-header">
              <div>  
                <div className="info-title-style">
                  Top 10 Countries with Highest CO2 Emissions {year?.year_id}
                </div>
                <div className="info-unit-style">
                  Click on a bar to learn more about that country!</div>
                <br />
                {/* bar chart of top 10 countries */}
                <div className="graph-style">
                  <BarChart width={650} height={500} 
                  data={year?.countries_emissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="country" stroke="#FFFFFF" interval={0}
                      height={150} tick={<CustomAxisTick />}
                      label={{value: 'Country', dy: 30, 
                      fill:'white', fontSize: 20}}/>
                    <YAxis 
                      stroke="#FFFFFF" width={100}
                      label={{value: 'CO2 Emissions (ppm)', dx: -30, 
                              fill:'white', fontSize: 20, angle: -90}}/>
                    <Tooltip />
                    <Bar dataKey="country_co2"      fill="#a8b3ba"
                        name="CO2 Emissions (ppm)" onClick={barClick}/>
                  </BarChart>
                </div>
                <div className="info-title-style" >
                  Top 10 Cities by Average Temperature {year?.year_id}
                </div>
                <div className="info-unit-style" >
                Click on a map marker or table row
                to learn more about that city!
                </div>
                {/* map and table of top 10 cities */}
                <YearMap
                  cities = {year?.city_temperatures !== undefined ? 
                            year?.city_temperatures : []}
                  map_style = {{height: '50vh', width: '85vh', 
                  marginLeft:'10vw',marginRight:'10vw', 
                  marginTop:'5vh', marginBottom:'5vh'}}/>
                <YearInstanceTable cities={year?.city_temperatures}/>
                <br/>
              </div>
            </header> 
          </div>  
          <div className="line">
            <Image src={require("../../../assets/line-shadow.png")} 
                  height="100%"></Image>
          </div>
          <div className="year-column2">
            <header className="Year-header">
              <div className="year-title">{year?.year_id} </div> <br />
              {/* year data */}
              {year_info.map((attr) => (
                <div>
                  <div className="info-style">{attr.info}</div>
                  <div className="info-title-style">{attr.title}</div>
                  <div className="info-title-style">{attr.title2}</div>
                  <div className="info-unit-style">{attr.unit}</div>
                  <br/>
                </div>))} <br />
            </header>
          </div>
        </div> )} 
    </div>
  );
};

/* relevant interfaces for years */

export interface YearsObject {
  years: Year[];
}

export interface Year {
  city_temperatures: CityTemperature[];
  co2: number;
  countries_emissions: CountriesEmission[];
  methane: number;
  nitrous_oxide: number;
  polar_ice: number;
  sea_level: number;
  temp_anomaly: number;
  world_population: number;
  year_id: number;
}

export interface CityTemperature {
  city: string;
  city_id: number;
  city_temp: number;
  country: Country;
  latitude: number;
  longitude: number;
  parent_year_id: number;
  year_id: number;
  year_name: number;
}

export enum Country {
  Bahrain = "Bahrain",
  Benin = "Benin",
  Brazil = "Brazil",
  BurkinaFaso = "Burkina Faso",
  Cameroon = "Cameroon",
  Colombia = "Colombia",
  Djibouti = "Djibouti",
  Ecuador = "Ecuador",
  Haiti = "Haiti",
  India = "India",
  Indonesia = "Indonesia",
  IvoryCoast = "Ivory Coast",
  Malaysia = "Malaysia",
  Mali = "Mali",
  Nicaragua = "Nicaragua",
  Niger = "Niger",
  Nigeria = "Nigeria",
  Philippines = "Philippines",
  Qatar = "Qatar",
  SaudiArabia = "Saudi Arabia",
  Senegal = "Senegal",
  Singapore = "Singapore",
  SriLanka = "Sri Lanka",
  Sudan = "Sudan",
  Togo = "Togo",
  UnitedArabEmirates = "United Arab Emirates",
  Venezuela = "Venezuela",
}

export interface CountriesEmission {
  code: string;
  country: string;
  country_co2: number;
  country_id: number;
  parent_year_id: number;
  year_id: number;
  year_name: string;
}

export default YearInstance;
