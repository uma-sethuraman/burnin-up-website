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
import useAxios from 'axios-hooks';
import Spinner from "react-bootstrap/Spinner";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const GeneralYears = () => {
  const [yearsObj, setYearsObj] = React.useState<YearsObject>();
  const [posts, setPosts] = useState<Year[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(22);


  const [{ data, loading, error }, refetch] = useAxios(
    '/api/years'
  )

  useEffect(() => {
    const yearsObj: YearsObject = data as YearsObject;
    if (yearsObj) {
      setPosts(yearsObj.years as Year[]);
    }
  }, [data]);
  


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Navbar />
      {loading? <Spinner animation="border" />: <header className="App-header">
        <h1> Annual Global Climate Change</h1>
        <Image src={require("../assets/fire.jpg")} width="600px" fluid />
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
            <DropdownButton
              title={"Decade"} className="mr-2">
              <Dropdown.Item eventKey="1">1980s</Dropdown.Item>
              <Dropdown.Item eventKey="1">1990s</Dropdown.Item>
              <Dropdown.Item eventKey="2">2000s </Dropdown.Item>
              <Dropdown.Item eventKey="3">2010s </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              title={"Methane Level"} className="mr-2">
              <Dropdown.Item eventKey="1">Less than 1000</Dropdown.Item>
              <Dropdown.Item eventKey="1">1000-1500</Dropdown.Item>
              <Dropdown.Item eventKey="2">Greater than 1500 </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              title={"Temperature Anomaly"} className="mr-2" >
              <Dropdown.Item eventKey="1">Less than 1</Dropdown.Item>
              <Dropdown.Item eventKey="2">Between 1 and 2 </Dropdown.Item>
              <Dropdown.Item eventKey="3">Between 2 and 3</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title={"Carbon Dioxide Level"} className="mr-2">
              <Dropdown.Item eventKey="1">Less than 300</Dropdown.Item>
              <Dropdown.Item eventKey="2">300-400 </Dropdown.Item>
              <Dropdown.Item eventKey="3">Greater than 400 </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              title={"Ice Extent"} className="mr-2">
              <Dropdown.Item eventKey="1">Greater than 20M</Dropdown.Item>
              <Dropdown.Item eventKey="2">Greater than 25M</Dropdown.Item>
              <Dropdown.Item eventKey="3">Greater than 30M</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
    
          </Form.Group>
        </Form>
        
        <br></br>
        {YearTable(currentPosts)}
        {Pagination(postsPerPage, posts.length, paginate)}
      </header>}
    </div>
  );
}

export default GeneralYears;