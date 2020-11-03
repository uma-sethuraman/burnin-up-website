import React from "react";
import "./GeneralYears.css";
import Image from "react-bootstrap/Image";
import Navbar from './components/OurNavbar';
import { Year, YearsObject } from "./components/Year/YearInstance";
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";
import MUIDataTable from "mui-datatables";

const GeneralYears = () => {
  const [years, setYears] = useState<Year[]>([]);

  const [{ data, loading, error }, refetch] = useAxios(
    '/api/years'
  )

  useEffect(() => {
    const yearsObj: YearsObject = data as YearsObject;
    if (yearsObj) {
      setYears(yearsObj.years as Year[]);
    }
  }, [data]);

  /* All columns of the years table */
  const columns = [
    {
      name: "year_id",
      label: "Year",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['1880-1900', '1900-1920', '1920-1940', '1940-1960', '1960-1980',
        '1980-2000', '2000-2018'],
        logic(year_id: any, filterVal: any) {
          const show =
            (filterVal.indexOf('1880-1900') >= 0 && year_id >= 1880 && year_id <= 1900) ||
            (filterVal.indexOf('1900-1920') >= 0 && year_id >= 1900 && year_id <= 1920) ||
            (filterVal.indexOf('1920-1940') >= 0 && year_id >= 1920 && year_id <= 1940) ||
            (filterVal.indexOf('1940-1960') >= 0 && year_id >= 1940 && year_id <= 1960) ||
            (filterVal.indexOf('1960-1980') >= 0 && year_id >= 1960 && year_id <= 1980) ||
            (filterVal.indexOf('1980-2000') >= 0 && year_id >= 1980 && year_id <= 2000) ||
            (filterVal.indexOf('2000-2018') >= 0 && year_id >= 2000 && year_id <= 2018);
          return !show;
        },
       },
      },
    },
    {
      name: "temp_anomaly",
      label: "Global Mean Surface Temperature Anomaly",
      options: {
       filter: true, 
       sort: true,
       filterOptions: {
        names: ['Positive', 'Negative'],
        logic(temp_anomaly: any, filterVal: any) {
          const show =
            (filterVal.indexOf('Positive') >= 0 && temp_anomaly >= 0) ||
            (filterVal.indexOf('Negative') >= 0 && temp_anomaly < 0);
          return !show;
        },
       },
      },
    },
    {
      name: "co2",
      label: "Mean Carbon Dioxide Level (ppm)",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['Low CO2 Level', 'Medium CO2 Level', 'High CO2 Level'],
        logic(co2:any, filterVal:any) {
          const show =
            (filterVal.indexOf('Low CO2 Level') >= 0 && co2 < 300) ||
            (filterVal.indexOf('Medium CO2 Level') >= 0 && co2 >= 300 && co2 < 350) ||
            (filterVal.indexOf('High CO2 Level') >= 0 && co2 >= 350);
          return !show;
        },
      },
      },
     },
     {
      name: "methane",
      label: "Methane Level (ppb)",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['Low Methane Level', 'Medium Methane Level', 'High Methane Level'],
        logic(methane:any, filterVal:any) {
          const show =
            (filterVal.indexOf('Low Methane Level') >= 0 && methane < 1000) ||
            (filterVal.indexOf('Medium Methane Level') >= 0 && methane >= 1000 && methane < 1500) ||
            (filterVal.indexOf('High Methane Level') >= 0 && methane >= 1500);
          return !show;
        },
      },
      },
     },
     {
      name: "nitrous_oxide",
      label: "Nitrous Oxide Level (ppb)",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['Low Nitrous Oxide Level', 'Medium Nitrous Oxide Level', 'High Nitrous Oxide Level'],
        logic(nitrous_oxide:any, filterVal:any) {
          const show =
            (filterVal.indexOf('Low Nitrous Oxide Level') >= 0 && nitrous_oxide < 290) ||
            (filterVal.indexOf('Medium Nitrous Oxide Level') >= 0 && nitrous_oxide >= 290 && nitrous_oxide < 320) ||
            (filterVal.indexOf('High Nitrous Oxide Level') >= 0 && nitrous_oxide >= 320);
          return !show;
        },
      },
      },
     },
     {
      name: "polar_ice",
      label: "Ice Extent (square km)",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['Small Ice Extent', 'Medium Ice Extent', 'Large Ice Extent'],
        logic(polar_ice:any, filterVal:any) {
          const show =
            (filterVal.indexOf('Small Ice Extent') >= 0 && polar_ice < 23000000) ||
            (filterVal.indexOf('Medium Ice Extent') >= 0 && polar_ice >= 23000000 && polar_ice < 27000000) ||
            (filterVal.indexOf('Large Ice Extent') >= 0 && polar_ice >= 27000000);
          return !show;
        },
      },
      },
     },
     {
      name: "sea_level",
      label: "Absolute Sea Level Change Since 1880 (inches)",
      options: {
       filter: true,
       sort: true,
       filterOptions: {
        names: ['Small Sea Level Change', 'Medium Sea Level Change', 'Large Sea Level Change'],
        logic(sea_level:any, filterVal:any) {
          const show =
            (filterVal.indexOf('Small Sea Level Change') >= 0 && sea_level < 2) ||
            (filterVal.indexOf('Medium Sea Level Change') >= 0 && sea_level >= 2 && sea_level < 6) ||
            (filterVal.indexOf('Large Sea Level Change') >= 0 && sea_level >= 6);
          return !show;
        },
      },
      },
     },
   ];

  /* Options for the cities table, initializing OnRowClick
  to redirect to that row's city page during a click */
  const options = {
    filterType: 'checkbox' as any,
    onRowClick: (rowData: any) => {
      window.location.assign('/years/id='+rowData[0]);
    },
  };

  return (
    <div className="GeneralYears">
      <Navbar />
      {loading? <Spinner animation="border" />: <header className="Years-header">
        <h1> Annual Global Climate Change</h1>
        <Image src={require("../assets/fire.jpg")} width="600px" fluid />
        <br />
        <div className="side-by-side">
          <Image src={require("../assets/filter_icon.png")} width="50px" fluid/>
          <p>&nbsp;&nbsp;Click this filter icon in the table to filter by any column.</p>
        </div>
        <p>Click on a column name to sort by that column.</p>
        <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
          <MUIDataTable
            title={"Annual Global Climate Change"}
            data={years}
            columns={columns}
            options={options}
          />
        </div>
      </header>}
    </div>
  );
}

export default GeneralYears;