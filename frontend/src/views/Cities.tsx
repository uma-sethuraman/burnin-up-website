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

const Cities = () => {
  const [cityObj, setCityObj] = React.useState<CityObject>();
  const [posts, setPosts] = useState<City[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);


const getData = () => {
  axios.get("/api/cities")
  .then((response)=>{
      const cityObj:CityObject = JSON.parse(JSON.stringify(response.data)) as CityObject;
      setCityObj(cityObj);
      setPosts(cityObj.cities);
    })
  .catch((error) => {
      console.log(error);
  })
};

getData();

  
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
const paginate = (pageNumber:number) => setCurrentPage(pageNumber);


  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Cities </h1>
        <Image src={require("../assets/city-landing-photo-singapore.jpg")} fluid />
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
            <DropdownButton title= {"Zip Code"} >
                  <Dropdown.Item eventKey="1">78739</Dropdown.Item>
                  <Dropdown.Item eventKey="2">20134 </Dropdown.Item>
                  <Dropdown.Item eventKey="3"> 410 </Dropdown.Item>

            </DropdownButton>
            <DropdownButton title= {"Elevation"} >
                  <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Less than 5000 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Less than 10,000</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title= {"Population"} >
                  <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Less than 5 million </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Less than 50 million</Dropdown.Item>
            </DropdownButton>
                
            <DropdownButton title= {"Time Zone"} >
                  <Dropdown.Item eventKey="1">China Standard Time</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Central Standard Time </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Central European Summer Time </Dropdown.Item>
            </DropdownButton>

            <DropdownButton title= {"Location"} >
                  <Dropdown.Item eventKey="1">Asia</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Europe </Dropdown.Item>
                  <Dropdown.Item eventKey="3">North America</Dropdown.Item>
            </DropdownButton>
            
            
            </ButtonGroup>
            </>
          </Form.Group>
        </Form>
        
        {CityPosts(currentPosts)}
        {Pagination(postsPerPage, posts.length, paginate)}
      </header>
    </div>
  );
}

export default Cities;
