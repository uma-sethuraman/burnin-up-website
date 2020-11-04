import React from "react";
import "./Cities.css";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import { CityObject, City } from "./components/City/CityInstance";
import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import Spinner from "react-bootstrap/Spinner";
import MUIDataTable from "mui-datatables";

/* General Cities Model Page (route: "/cities") */
const Cities = () => {
  /* Array of all cities retrieved from api */
  const [cities, setCities] = useState<City[]>([]);

  /* Loads api data into data */
  const [{ data, loading, error }] = useAxios("/api/cities");

  /* If request returns error, redirect to 404 page */
  if (error) {
    window.location.assign("/404");
  }
  /* Fills the cities array with the correct values retrieved from data */
  useEffect(() => {
    const cityObj: CityObject = data as CityObject;
    if (cityObj) {
      setCities(cityObj.cities);
    }
  }, [data]);

  /* All columns of the cities table */
  const columns = [
    {
      name: "city_id",
      label: "City ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "city_name",
      label: "City",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["A-I", "J-R", "S-Z"],
          logic(city_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A-I") >= 0 &&
                city_name.charCodeAt(0) >= "A".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "I".charCodeAt(0)) ||
              (filterVal.indexOf("J-R") >= 0 &&
                city_name.charCodeAt(0) >= "J".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "R".charCodeAt(0)) ||
              (filterVal.indexOf("S-Z") >= 0 &&
                city_name.charCodeAt(0) >= "S".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
        },
      },
    },
    {
      name: "country_name",
      label: "Country",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["A-I", "J-R", "S-Z"],
          logic(country_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A-I") >= 0 &&
                country_name.charCodeAt(0) >= "A".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "I".charCodeAt(0)) ||
              (filterVal.indexOf("J-R") >= 0 &&
                country_name.charCodeAt(0) >= "J".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "R".charCodeAt(0)) ||
              (filterVal.indexOf("S-Z") >= 0 &&
                country_name.charCodeAt(0) >= "S".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
        },
      },
    },
    {
      name: "o3",
      label: "O3 (Dobson Units)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low O3", "Medium O3", "High O3"],
          logic(o3: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low O3") >= 0 && o3 < 15) ||
              (filterVal.indexOf("Medium O3") >= 0 && o3 >= 15 && o3 < 30) ||
              (filterVal.indexOf("High O3") >= 0 && o3 >= 30);
            return !show;
          },
        },
      },
    },
    {
      name: "pm10",
      label: "PM10 (ug/m3)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low PM10", "Medium PM10", "High PM10"],
          logic(pm10: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low PM10") >= 0 && pm10 < 20) ||
              (filterVal.indexOf("Medium PM10") >= 0 &&
                pm10 >= 20 &&
                pm10 < 60) ||
              (filterVal.indexOf("High PM10") >= 0 && pm10 >= 60);
            return !show;
          },
        },
      },
    },
    {
      name: "pm25",
      label: "PM2.5 (ug/m3)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low PM2.5", "Medium PM2.5", "High PM2.5"],
          logic(pm25: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low PM2.5") >= 0 && pm25 < 50) ||
              (filterVal.indexOf("Medium PM2.5") >= 0 &&
                pm25 >= 50 &&
                pm25 < 100) ||
              (filterVal.indexOf("High PM2.5") >= 0 && pm25 >= 100);
            return !show;
          },
        },
      },
    },
    {
      name: "population",
      label: "Population",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value:any, tableMeta:any, updateValue:any) => (
          value !== -1?
          <div>{value}</div>:
          <div>-</div> // for cities without population data
        ),
        /* filtering options */
        filterOptions: {
          names: ["Small Population", "Medium Population", "Large Population"],
          logic(population: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Small Population") >= 0 &&
                population < 500000) ||
              (filterVal.indexOf("Medium Population") >= 0 &&
                population >= 500000 &&
                population < 5000000) ||
              (filterVal.indexOf("Large Population") >= 0 &&
                population >= 5000000);
            return !show;
          },
        },
      },
    },
  ];

  /* Options for the cities table, initializing OnRowClick
  to redirect to that row's city page during a click */
  const options = {
    filterType: "checkbox" as any,
    onRowClick: (rowData: any) => {
      window.location.assign("/cities/id=" + rowData[0]);
    },
  };

  return (
    <div className="Cities">
      <Navbar />

      {/* Display loading animation if data is still loading */}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <header className="Cities-header">
          <h1>Cities </h1>
          <Image
            src={require("../assets/city-landing-photo-singapore.jpg")}
            width="600px"
            fluid
          />
          <br />
          <div className="side-by-side">
            <Image
              src={require("../assets/filter_icon.png")}
              width="50px"
              fluid
            />
            <p>
              &nbsp;&nbsp;Click this filter icon in the table to filter by any
              column.
            </p>
          </div>
          <p>Click on a column name to sort by that column.</p>
          {/* Displaying the table of all cities, with searching and pagination */}
          <div style={{ display: "table", tableLayout: "fixed", width: "100%" }}>
            <MUIDataTable
              title={"Cities"}
              data={cities}
              columns={columns}
              options={options}
            />
          </div>
        </header>
      )}
    </div>
  );
};

export default Cities;
