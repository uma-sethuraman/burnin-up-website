import { Link } from 'react-router-dom';
import React from "react";
import "./Cities.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "./components/OurNavbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import { CityObject, City } from "./components/City/CityInstance";
import { useState, useEffect } from 'react';
import CityPosts from "./components/CityPosts";
import Pagination from "./components/Pagination";
import { ButtonToolbar } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";
import MUIDataTable from "mui-datatables";
import { constants } from 'os';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/* General Cities Model Page (route: "/cities") */
const Cities = () => {

  /* Array of all cities retrieved from api */
  const [cities, setCities] = useState<City[]>([]);

  /* Loads api data into data */
  const [{ data, loading, error }, refetch] = useAxios('/api/cities');

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
      }
    },
    {
      name: "city_name",
      label: "City",
      options: {
       filter: true,
       sort: true,
      }
    },
    {
     name: "country_iso2code",
     label: "Country ISO2 Code",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "o3",
     label: "O3 (Dobson Units)",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "pm10",
     label: "PM10 (ug/m3)",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "pm25",
      label: "PM2.5 (ug/m3)",
      options: {
       filter: true,
       sort: false,
      }
    },
    {
      name: "population",
      label: "Population",
      options: {
       filter: true,
       sort: false,
      }
     },
   ];

  /* Options for the cities table, initializing OnRowClick
  to redirect to that row's city page during a click */
  const options = {
    filterType: 'checkbox' as any,
    onRowClick: (rowData: any) => {
      window.location.assign('/cities/id='+rowData[0]);
    },
  };

  return (
    <div className="Cities">
      <Navbar />

      {/* Display loading animation if data is still loading */}
      {loading? <Spinner animation="border" />: <header className="Cities-header">

        <h1>Cities </h1>
        <Image src={require("../assets/city-landing-photo-singapore.jpg")} width="600px" fluid />
        <br />

        {/* Displaying table filtering options */}
        <Form>
          <Form.Group>
            <ButtonGroup>
              <DropdownButton className="mr-2" title={"Name"} >
                <Dropdown.Item eventKey="1">A-Z</Dropdown.Item>
                <Dropdown.Item eventKey="2">Z-A </Dropdown.Item>
              </DropdownButton>
              <DropdownButton className="mr-2" title={"O3"}>
                <Dropdown.Item eventKey="1">Greater than 10</Dropdown.Item>
                <Dropdown.Item eventKey="2">Greater than 20 </Dropdown.Item>
                <Dropdown.Item eventKey="3"> Greater than 30 </Dropdown.Item>
              </DropdownButton>

              <DropdownButton className="mr-2" title={"PM10"} >
                <Dropdown.Item eventKey="1">Less than 20</Dropdown.Item>
                <Dropdown.Item eventKey="2"> 20 - 60</Dropdown.Item>
                <Dropdown.Item eventKey="3">Greater than 60</Dropdown.Item>
              </DropdownButton>

              <DropdownButton className="mr-2" title={"PM2.5"} >
                <Dropdown.Item eventKey="1">Less than 50</Dropdown.Item>
                <Dropdown.Item eventKey="2">500-100</Dropdown.Item>
                <Dropdown.Item eventKey="3">Greater than 100</Dropdown.Item>
              </DropdownButton>
              <DropdownButton className="mr-2" title={"Population"} >
                <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
                <Dropdown.Item eventKey="2">Less than 5 million </Dropdown.Item>
                <Dropdown.Item eventKey="3">Less than 50 million</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Form.Group>
        </Form>

        {/* Displaying the table of all cities, with searching and pagination */}
        <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
          <MUIDataTable
            title={"Cities"}
            data={cities}
            columns={columns}
            options={options}
          />
        </div>
      </header>}
    </div>
  );
}

export default Cities;
