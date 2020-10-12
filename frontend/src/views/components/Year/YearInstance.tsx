import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import ImageBackground from "react";
import View from "react";
import "./YearInstance.css";
import Carousel from "react-bootstrap/Carousel";
import OurCarousel from "../OurCarousel";
import Slide from "../../../Slide";
import { useState, useEffect } from 'react';

function YearInstance() {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
    fetch('/api/country').then(response =>
        response.json().then(data => {
            setCountries(data);
        })
    );
    },[]);
    console.log(countries);

    return (
    <div className="YearInstance">
        <Navbar />
        <header className="App-header">
        <h1>
            Year 2015
        </h1>
        <header className="Year-header">
            <div className="image-text">
            <h3> 2015 </h3>
            </div>
        </header>
        <br />
        <p>World Population: 7,349,472,099</p>
        <p>Global Mean Surface Temperature Anomaly: 1.04</p>
        <p>Carbon Dioxide Levels: 400.83 ppm</p>
        <p>Methane Levels: 1834.23 ppm(?)</p>
        <p>Nitrous Oxide Levels: 328.175 ppb</p>
        <p>Ice Extent: 22245529.616666663 square kilometers</p>
        <p>Absolute Sea Level Change since 1880: 8.943307703 inches</p>
        <p>Top 10 Countries for Highest CO2 emissions: </p>
        <p>Top 10 Cities for Highest Temperatures: </p>
        <Image src={require("../../../assets/temperature-graph.jpg")}/>
        <div>See more: </div>
        <p>
            <Link to="/climatechange/2013">2013</Link>
        </p>
        <p>
            <Link to="/climatechange/2014">2014</Link>
        </p>
        
        </header>
    </div>
    );
}

export default YearInstance;
