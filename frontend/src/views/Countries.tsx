import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import { CountriesObject, Country } from "./components/Country/CountryInstance";
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";
import MUIDataTable from "mui-datatables";
import "./Countries.css";
import {MUIDataTableColumnDef} from "mui-datatables";

/* general countries model page (route: "/countries") */
const Countries = () => {
  
  /* array of all countries retrieved from api */
  const [countries, setCountries] = useState<Country[]>([]);

  /* loads api data into data */
  const [{ data, loading, error }] = useAxios('/api/countries')

  /* if request returns error, redirect to 404 page */
  if (error) {
    window.location.assign("/404");
  }
  
  /* fills the countries array with the correct values retrieved from data */
  useEffect(() => {
    const countryObj: CountriesObject = data as CountriesObject;
    if (countryObj) {
      setCountries(countryObj.countries);
    }
  }, [data]);

  /* all columns of the countries table, with sorting
  and filtering options set */
  const columns = [
    {
      name: "country_id",
      label: "Country ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      }
    },
    {
      name: "country_name",
      label: "Country",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['A-I', 'J-R', 'S-Z'],
          logic(country_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf('A-I') >= 0 &&
                country_name.charCodeAt(0) >= ('A'.charCodeAt(0)) &&
                country_name.charCodeAt(0) <= ('I'.charCodeAt(0))) ||

              (filterVal.indexOf('J-R') >= 0 &&
                country_name.charCodeAt(0) >= ('J'.charCodeAt(0)) &&
                country_name.charCodeAt(0) <= ('R'.charCodeAt(0))) ||

              (filterVal.indexOf('S-Z') >= 0 &&
                country_name.charCodeAt(0) >= ('S'.charCodeAt(0)) &&
                country_name.charCodeAt(0) <= ('Z'.charCodeAt(0)));
            return !show;
          },
        },
      },
    },
    {
      name: "income_level",
      label: "Income Level",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['High Income', 'Upper Middle Income', 
          'Lower Middle Income', 'Low Income'],
          logic(income_level: any, filterVal: any) {
            const show =
              (filterVal.indexOf('High Income') >= 0 &&
                (income_level === "High income" || 
                income_level === "High Income")) ||

              (filterVal.indexOf('Upper Middle Income') >= 0 &&
                (income_level === "Upper middle income" || 
                income_level === "Upper Middle Income")) ||

              (filterVal.indexOf('Lower Middle Income') >= 0 &&
                (income_level === "Lower middle income")) ||

              (filterVal.indexOf('Low Income') >= 0 &&
                (income_level === "Low income"));
            return !show;
          },
        },
      },
    },
    {
      name: "country_region",
      label: "Country Region",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "country_capital_city",
      label: "Capital City",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['A-I', 'J-R', 'S-Z'],
          logic(city_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf('A-I') >= 0 &&
                city_name.charCodeAt(0) >= ('A'.charCodeAt(0)) &&
                city_name.charCodeAt(0) <= ('I'.charCodeAt(0))) ||

              (filterVal.indexOf('J-R') >= 0 &&
                city_name.charCodeAt(0) >= ('J'.charCodeAt(0)) &&
                city_name.charCodeAt(0) <= ('R'.charCodeAt(0))) ||

              (filterVal.indexOf('S-Z') >= 0 &&
                city_name.charCodeAt(0) >= ('S'.charCodeAt(0)) &&
                city_name.charCodeAt(0) <= ('Z'.charCodeAt(0)));
            return !show;
          },
        },
      },
    },
    {
      name: "country_population",
      label: "Population",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['Small Population', 'Medium Population', 'Large Population'],
          logic(country_population: any, filterVal: any) {
            const show =
              (filterVal.indexOf('Small Population') >= 0 && 
              country_population < 1000000) ||
              (filterVal.indexOf('Medium Population') >= 0 && 
              country_population >= 1000000 && 
              country_population < 100000000) ||
              (filterVal.indexOf('Large Population') >= 0 && 
              country_population >= 100000000);

            return !show;
          },
        },
      },
    },
    {
      name: "lat",
      label: "Latitude",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['Northern Hemisphere', 'Southern Hemisphere'],
          logic(lat: any, filterVal: any) {
            const show =
              (filterVal.indexOf('Northern Hemisphere') >=0 && lat >= 0) ||
              (filterVal.indexOf('Southern Hemisphere') >= 0 && lat < 0);
            return !show;
          },
        },
      },
    },
    {
      name: "long",
      label: "Longitude",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['Western Hemisphere', 'Eastern Hemisphere'],
          logic(lon: any, filterVal: any) {
            const show =
              (filterVal.indexOf('Western Hemisphere') >= 0 && lon < 0) ||
              (filterVal.indexOf('Eastern Hemisphere') >= 0 && lon >= 0);
            return !show;
          },
        },
      },
    },
    {
      name: "recent_emissions",
      label: "Most Recent CO2 Emissions (ppm)",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ['Low CO2', 'Medium CO2', 'High CO2'],
          logic(co2: any, filterVal: any) {
            const show =
              (filterVal.indexOf('Low CO2 Emissions') >= 0 && co2 < 50) ||
              (filterVal.indexOf('Medium CO2 Emissions') >= 0 && 
              co2 >= 50 && 
              co2 < 100) ||
              (filterVal.indexOf('High CO2 Emissions') >= 0 && co2 >= 100);
            return !show;
          },
        },
      },
    },
  ];

  /* options for the countries table, initializing OnRowClick
  to redirect to that row's country page during a click */
  const options = {
    filterType: 'checkbox' as any,
    onRowClick: (rowData: any) => {
      window.location.assign('/countries/id=' + rowData[0]);
    },
  };

  return (
    <div className="Countries">
      <Navbar />

      {/* display loading animation if data is still loading */}
      {loading ? <Spinner animation="border" /> : 
      <header className="Countries-header">
        <h1>Countries</h1>
        <Image src={require("../assets/world-map.jpeg")} width="600px" fluid />
        <br />
        <div className="side-by-side">

        {/* displaying instructions on how to sort and filter */}
        <Image src={require("../assets/filter_icon.png")} width="50px" fluid/>
          <p>&nbsp;&nbsp;Click this filter icon in the table to filter by any
             column.</p>
          </div>
        <p>Click on a column name to sort by that column.</p>

        {/* displaying table with all country instances */}
        <div style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
          <MUIDataTable
            title={"Countries"}
            data={countries}
            columns={columns as MUIDataTableColumnDef[]}
            options={options}
          />
        </div>
      </header>}
    </div>
  );
}

export default Countries;
