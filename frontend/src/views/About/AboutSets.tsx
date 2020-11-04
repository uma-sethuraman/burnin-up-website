import React from "react";
import "./About.css";

import Image from "react-bootstrap/Image";
import PostmanLogo from "../../assets/PostmanLogo.png";
import GitlabLogo from "../../assets/GitlabLogo.jpg";

/* displays datasets and APIs on About Us page */
function AboutSets() {
    return(
    <div className="h2_about">
        <h2>
            <a href="https://documenter.getpostman.com/view/12123261/TVRdAWse">
            Our Postman API<br></br>
            <Image className="ToolImage" src={PostmanLogo} />
            </a>
        </h2>

        <br></br>

        <h2>
            <a href="https://gitlab.com/caitlinlien/cs373-sustainability/">
            Our GitLab Repository<br></br>
            <Image className="ToolImage" src={GitlabLogo} />
            </a>
        </h2>

        <br></br>

        <div className="purpose">
            <h2>Different API and data sources</h2>
            <p></p>
            Raw csv data formatted using Jupyter Notebook and Pandas.
            Flask, SQL Alchemy, and URL Lib were used to get data from the external APIs and create the JSON response.

            <li><a 
            href="https://developers.google.com/places/web-service/photos">
            Google Places API: </a>
            Used to get images of the cities and countries.</li>

            <li><a href=
            "https://developers.google.com/maps/documentation/javascript/overview">Google Geo Location API: </a> 
            Used to map cities and countries.</li>

            <li><a 
            href="https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries">
            World Bank API: </a> 
            Used to get general information on countries.</li>
            
            <li><a href="https://public.opendatasoft.com/explore/dataset/worldcitiespop/api/?disjunctive.country&sort=population">
            OpenDataSoft WorldCitiesPop API: </a> 
            Used to get the general information of cities.</li>

            <li><a href="https://developers.google.com/maps/documentation/geocoding/overview">
            Google Geocoding API: </a> 
            Used to get latitude and longitude of cities.</li>

            <li><a href="https://aqicn.org/api/">
            Air Quality Programmatic API: </a> 
            Used to get air quality data on different cities.</li>

            <li><a href="https://global-warming.org/">
            Global Warming API: </a> 
            Used to get climate data for temperature anomalies.</li>

            <li><a href="https://www.algolia.com/">
            Algolia: </a> 
            Used to facilitate searching through the entire website.</li>

            <li><a 
            href="https://data.giss.nasa.gov/modelforce/ghgases/Fig1A.ext.txt">
            Carbon Emissions Dataset 1: </a> 
            Used to get global carbon emissions from 1880-2019.</li>

            <li><a href=
            "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_annmean_mlo.txt">
            Carbon Emissions Dataset 2: </a> 
            Used to get global carbon emissions from 1880-2019.</li>

            <li><a href=
            "ftp://aftp.cmdl.noaa.gov/products/trends/ch4/ch4_annmean_gl.txt">
            Methane Dataset: </a> 
            Used to get global methane levels from 1880-2019.</li>

            <li><a href=
            "ftp://ftp.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/law/law2006.txt"> Nitrous Oxide Dataset 1: </a> 
            Used to get global nitrous oxide levels from 1880-2019.</li>

            <li><a href=
            "https://www.epa.gov/sites/production/files/2016-08/ghg-concentrations_fig-3.csv">
            Nitrous Oxide Dataset 2: </a> 
            Used to get global nitrous oxide levels from 1880-2019.</li>

            <li><a href="https://nsidc.org/data/g10010">
            Polar Ice Dataset: </a> 
            Used to get polar ice extent from 1880-2019.</li>

            <li><a href="https://www.jpl.nasa.gov/edu/teach/activity/graphing-sea-level-trends/">Sea Level Dataset: 
            </a> Used to get global sea levels from 1800-2018.</li>

            <li><a href="https://ourworldindata.org/world-population-growth">
            World Population Dataset: </a> 
            Used to get the world population from 1800-2019.</li>

        </div>
    </div>
    );
}

export default AboutSets;