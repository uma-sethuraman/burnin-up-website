import { Link } from "react-router-dom";
import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "./components/OurNavbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { CountriesObject, Country} from "./components/Country/CountryInstance";
import { useState, useEffect } from 'react';
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const Countries = () => {
  const [countriesObj, setCountriesObj] = React.useState<CountriesObject>();
  const [posts, setPosts] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);


  // gets data from API

  const [{ data, loading, error }, refetch] = useAxios(
    '/api/countries'
  )
  

  useEffect(() => {
    const countryObj: CountriesObject = data as CountriesObject;
    if (countryObj) {
      setPosts(countryObj.countries);
    }
  }, [data]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log(currentPosts);
  return (
    <div className="App">
      <Navbar />
      {loading? <Spinner animation="border" />: <header className="App-header">
        <h1>Countries</h1>
        <Image src={require("../assets/world-map.jpeg")} width="600px" fluid />
        <br></br>
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
            <>
              <ButtonGroup>
                <DropdownButton className="mr-2" title={"Income Level"}>
                  <Dropdown.Item eventKey="1">Low Income</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Middle Income</Dropdown.Item>
                  <Dropdown.Item eventKey="3">High Income</Dropdown.Item>
                </DropdownButton>

                <DropdownButton className="mr-2" title={"Region"}>
                  <Dropdown.Item eventKey="1">Europe</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Asia</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Middle East</Dropdown.Item>
                  <Dropdown.Item eventKey="4">North America</Dropdown.Item>
                  <Dropdown.Item eventKey="5">South America</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Africa</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Australia</Dropdown.Item>
                </DropdownButton>

                <DropdownButton className="mr-2" title={"Capital City"}>
                  <Dropdown.Item eventKey="1">A to Z</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Z to A</Dropdown.Item>
                </DropdownButton>

                <DropdownButton className="mr-2" title={"Latitude"}>
                  <Dropdown.Item eventKey="1">60° - 90°</Dropdown.Item>
                  <Dropdown.Item eventKey="2">30° - 60°</Dropdown.Item>
                  <Dropdown.Item eventKey="3">0° - 30°</Dropdown.Item>
                  <Dropdown.Item eventKey="1">-30°- 0° </Dropdown.Item>
                  <Dropdown.Item eventKey="2">-60° - -30°</Dropdown.Item>
                  <Dropdown.Item eventKey="3">-90° - -60°</Dropdown.Item>
                </DropdownButton>

                <DropdownButton className="mr-2" title={"Recent CO2 Emission"}>
                  <Dropdown.Item eventKey="1">Less than 5</Dropdown.Item>
                  <Dropdown.Item eventKey="2">5-15</Dropdown.Item>
                  <Dropdown.Item eventKey="3">More than 15</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </>
          </Form.Group>
        </Form>
        <Form></Form>
        {Posts(currentPosts)}
        {Pagination(postsPerPage, posts.length, paginate)}
      </header>}
    </div>
  );
}

export default Countries;
