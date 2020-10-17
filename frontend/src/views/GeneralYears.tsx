import { Link } from 'react-router-dom';
import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Navbar from './components/OurNavbar';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Year, YearsObject } from "./components/Year/YearInstance";
import { useState, useEffect } from 'react';
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import YearTable from "./components/YearTable";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const GeneralYears = () => {
  const [yearsObj, setYearsObj] = React.useState<YearsObject>();
  const [posts, setPosts] = useState<Year[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  // gets data from API
  const getData = () => {
    axios.get("/api/years")
    .then((response)=>{
        const yearsObj:YearsObject = response.data as YearsObject;
        setYearsObj(yearsObj);
        setPosts(yearsObj.years as Year[]);
        console.log(posts);
        console.log(yearsObj);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  getData();
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Global Climate Change</h1>
        <Image src={require("../assets/fire.jpg")} fluid />
        <Form>
          <Form.Group>
            <Form.Label>Search Bar</Form.Label>
            <Form.Control placeholder="Enter search" />
          </Form.Group>
          <Button variant="outline-info">Search</Button>
        </Form>
        <>
            <ButtonGroup>
            <DropdownButton
              title= {"Decade"} >
                  <Dropdown.Item eventKey="1">1990s</Dropdown.Item>
                  <Dropdown.Item eventKey="2">2000s </Dropdown.Item>
                  <Dropdown.Item eventKey="3">2010s </Dropdown.Item>

            </DropdownButton>
            <DropdownButton
              title= {"Temperature Anomaly"} >
                  <Dropdown.Item eventKey="1">Less than 1</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Between 1 and 2 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Between 2 and 3</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title= {"Carbon Dioxide Level"} >
                  <Dropdown.Item eventKey="1">Less than 300</Dropdown.Item>
                  <Dropdown.Item eventKey="2">300-400 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Greater than 400 </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title= {"Ice Extent"} >
                  <Dropdown.Item eventKey="1">Less than 4</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Between 4-5 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">Greater than 4</Dropdown.Item>
            </DropdownButton>
            </ButtonGroup>
            </>
        <Form></Form>
        {YearTable(currentPosts)}
        {Pagination(postsPerPage, posts.length, paginate)}
      </header>
    </div>
  );
}

export default GeneralYears;