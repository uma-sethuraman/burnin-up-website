import React from "react";
import Image from "react-bootstrap/Image";
import "./About.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import mapsIcon from "../../assets/maps-icon.svg"
import worldBank from "../../assets/worldbank.svg"
import openSoft from "../../assets/openDataWorldCitiesPop.png"
import aqicn from "../../assets/AQIcn.png"
import GlobalWarmingAPI from "../../assets/GlobalWarmingAPI.png"
import AlgoliaLogo from "../../assets/algolialogo.png"
import nasalogo from "../../assets/nasa-logo.png"
import noaa from "../../assets/noaa.png"
import epa from "../../assets/epa.png"
import nsidc from "../../assets/nsidc.png"
import our_world_in_data from "../../assets/our_world_in_data.jpg"
import PostmanLogo from "../../assets/postmanicon.png";
import GitlabLogo from "../../assets/gitlabicon.png";
import AboutToolSetCard from "./AboutToolSetCard";

/* displays datasets and APIs on About Us page */

/* tutorial from: https://www.newline.co/@dmitryrogozhny/
how-to-show-carousel-in-react-applications-with-react-slick--07445c23 */

function AboutSets() {

  /* list of datasets and apis */
  const sets = [
    {
      href:"https://developers.google.com/places/web-service/photos",
      caption: "Google Places API:", 
      purpose: " Used to get images of the cities and countries.",
      src: mapsIcon,
      key: 0
    },
    {
      href:"https://developers.google.com/maps/documentation/"
      +"javascript/overview",
      caption: "Google Geo Location API:", 
      purpose: " Used to map cities and countries.",
      src: mapsIcon,
      key: 1
    },
    {
      href:  "https://datahelpdesk.worldbank.org/knowledgebase/articles/"
      +"898599-indicator-api-queries",
      caption: "World Bank API:", 
      purpose: " Used to get general information on countries.",
      src: worldBank,
      key: 2
    },
    {
      href:  "https://public.opendatasoft.com/explore/dataset/"
        +"worldcitiespop/api/?disjunctive.country&sort=population",
      caption: "OpenDataSoft WorldCitiesPop API:", 
      purpose: " Used to get the general information of cities.",
      src: openSoft,
      key: 3
    },
    {
      href:  "https://developers.google.com/maps/documentation/"
      +"geocoding/overview",
      caption: "Google Geocoding API:", 
      purpose: " Used to get latitude and longitude of cities.",
      src: mapsIcon,
      key: 4
    },
    {
      href:"https://aqicn.org/api/",
      caption: "Air Quality Programmatic API:", 
      purpose: " Used to get air quality data on different cities.",
      src: aqicn,
      key: 5
    },
    {
      href:"https://global-warming.org/",
      caption: "Global Warming API:", 
      purpose: " Used to get climate data for temperature anomalies.",
      src:  GlobalWarmingAPI,
      key: 6
    },
    {
      href:"https://www.algolia.com/",
      caption: "Algolia:", 
      purpose: " Used to facilitate searching through the entire website.",
      src: AlgoliaLogo,
      key: 7
    },
    {
      href:"https://data.giss.nasa.gov/modelforce/ghgases/Fig1A.ext.txt",
      caption: "Carbon Emissions Dataset 1:", 
      purpose: " Used to get global carbon emissions from 1880-2019.",
      src: nasalogo,
      key: 8
    },
    {
      href: "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_annmean_m"
          +"lo.txt",
      caption: "Carbon Emissions Dataset 2:", 
      purpose: " Used to get global carbon emissions from 1880-2019.",
      src: mapsIcon,
      key: 9
    },
    {
     href: "ftp://aftp.cmdl.noaa.gov/products/trends/ch4/"
            +"ch4_annmean_gl.txt",
     caption: "Methane Dataset:", 
     purpose: " Used to get global methane levels from 1880-2019.",
     src: noaa,
     key: 10
    },
    {
      href: "ftp://ftp.ncdc.noaa.gov/pub/data/paleo/icecore/"+
              "antarctica/law/law2006.txt",
      caption: "Nitrous Oxide Dataset 1:",
      purpose:" Used to get global nitrous oxide levels from 1880-2019.",
      src: noaa,
      key: 11
    },
    {
      href:  "https://www.epa.gov/sites/production/files/"+
      "2016-08/ghg-concentrations_fig-3.csv",
      caption: "Nitrous Oxide Dataset 2:",
      purpose:" Used to get global nitrous oxide levels from 1880-2019.",
      src: epa,
      key: 12
    },
    {
      href:"https://nsidc.org/data/g10010",
      caption: "Polar Ice Dataset:",
      purpose:" Used to get polar ice extent from 1880-2019.",
      src: nsidc,
      key: 13
    },
    {
     href:  "https://www.jpl.nasa.gov/edu/teach/activity/"
      +"graphing-sea-level-trends/",
      caption: "Sea Level Dataset:", 
      purpose: " Used to get global sea levels from 1800-2018.",
      src: nasalogo,
      key: 14
    },
    {
      href:"https://ourworldindata.org/world-population-growth",
      caption: "World Population Dataset:",
      purpose: " Used to get the world population from 1800-2019.",
      src: our_world_in_data,
      key: 15
    },
  
  ];

  /* displays cards for datasets/apis */
  const renderSlides = () =>
    sets.map((set) => (
      <div key={set.key}>
        <AboutToolSetCard toolset={set} />
      </div>
    ));

  /* display datasets/apis */
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <a href={"https://documenter.getpostman.com/view/"
              +"12123261/TVRdAWse"}>
                <Image className="ToolImage" src={PostmanLogo} />
                <br></br>
                <u>Our Postman API</u>
              </a>
            </h2>
          </div>
          <div className="col-sm-6">
            <h2>
              <a href="https://gitlab.com/caitlinlien/cs373-sustainability/">
              <Image className="ToolImage" src={GitlabLogo} />
              <br></br>
              <u>Our GitLab Repository</u>
              </a>
            </h2>
          </div>
        </div>
      </div>
      <br></br>
      <div className="p_about">
        <h2>APIs and Data Sources</h2>
        <p>
        Raw csv data formatted using Jupyter Notebook and Pandas. Flask, SQL
        Alchemy, and URL Lib were used to get data from the external APIs and
        create the JSON response.</p>
        <br/>
        <Slider dots={true}
          autoplay={true}
          slidesToShow={4}>
          {renderSlides()}
        </Slider>
      </div>
    </div>
  );
}

export default AboutSets;