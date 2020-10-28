import { Link } from 'react-router-dom';
import React from "react";
import "./App.css";
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


const Cities = () => {

  function myClick (city_id: string) {
    return "/cities/id=" + city_id;
  }
  
  const columns = [
    {
     name: "city_name",
     label: "City",
     options: {
      filter: true,
      sort: true,
      onClick: myClick(id),
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
  const [cityObj, setCityObj] = React.useState<CityObject>();
  const [posts, setPosts] = useState<City[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);

  const [{ data, loading, error }, refetch] = useAxios(
    '/api/cities'
  )
  useEffect(() => {
    const cityObj: CityObject = data as CityObject;
    if (cityObj) {
      setPosts(cityObj.cities);
    }
  }, [data]);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const options = {
    filterType: 'checkbox' as any,
  };

  return (
    <div className="App">
      <Navbar />
      {loading? <Spinner animation="border" />: <header className="App-header">
          <MUIDataTable
            title={"Cities"}
            data={posts}
            columns={columns}
            options={options}
          />
        <h1>Cities </h1>
        <Image src={require("../assets/city-landing-photo-singapore.jpg")} width="600px" fluid />
        <br />
        <Form>
          <Form.Group>
            <Form>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
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

        {CityPosts(currentPosts)}
        {Pagination(postsPerPage, posts.length, paginate)}
      </header>}
    </div>
  );
}

export default Cities;
