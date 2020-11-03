import React from "react";
import "./About.css";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";

/* Importing images for all group members */
import UmaSethuraman from "../assets/uma-headshot.jpg";
import CaitlinOCallaghan from "../assets/caitlin-o-headshot.jpeg";
import LaurenMangibin from "../assets/LaurenMangibin-headshot.jpg";
import SamanthaTuapen from "../assets/samantha-headshot.jpg";
import CatilinLien from "../assets/CaitlinLien.jpeg";
import CherrySun from "../assets/cherry.jpeg";

/* Importing images for tools and data sections */
import PostmanLogo from "../assets/PostmanLogo.png";
import GitlabLogo from "../assets/GitlabLogo.jpg";
import ReactLogo from "../assets/ReactLogo.jpg";
import ReactBootstrapLogo from "../assets/ReactBootstrap.png";
import ElasticBeanstalkLogo from "../assets/ElasticBeanstalk.png";
import NameCheapLogo from "../assets/NameCheapLogo.png";
import DiscordLogo from "../assets/DiscordLogo.png";
import JupyterNotebookLogo from "../assets/JupyterNotebook.svg";

function About() {

  /* Team member information */
  const [members, changeMembers] = useState<GroupMember[]>([
    {
      name: "Caitlin Lien",
      email: "caitlinlien@utexas.edu",
      username: "caitlinlien"
    },
    {
      name: "Caitlin O'Callaghan",
      email: "caitlinocallaghan@Caitlins-MBP.lan",
      username: "caitlinocallaghan"
    },
    {
      name: "Cherry Sun",
      email: "cherrysun9@utexas.edu",
      username: "cherrysun9"
    },
    {
      name: "Lauren Mangibin",
      email: "lauren.mangibin@gmail.com",
      username: "lauren.mangibin"
    },
    {
      name: "Samantha Tuapen",
      email: "samtuapen@utexas.edu",
      username: "samantha3pen"
    },
    {
      name: "Uma Sethuraman",
      email: "uma.sethuraman@utexas.edu",
      username: "uma-sethuraman"
    },
  ]);

  /* Cumulative totals for about page statistics */
  const [issuesSum, changeIssuesSum] = useState(-1);
  const [commitsSum, changeCommitsSum] = useState(-1);
  const unittestsSum: number = 105;

  /* Create a copy of the members array to apply changes to */
  let membersCopy: GroupMember[] = JSON.parse(JSON.stringify(members));

  /* Retrieves data about GitLab issues per contributor */
  const issuesApiRequest = () => {

    /* Populates requestArray with all issues requests */
    const requestURL: string =
      "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=";
    const requestArray = [];
    for (const member of members) {
      requestArray.push(axios.get(requestURL + member.username));
    }

    /* Updates issues number for all people in members */
    axios.all([...requestArray]).then(
      axios.spread((...responses) => {
        let totalIssues = 0;
        for (let i = 0; i < responses.length; i++) {
          const response: Gitlab = JSON.parse(JSON.stringify(responses[i])) as Gitlab;
          membersCopy[i].issues = response.data.statistics.counts.all;
          totalIssues += response.data.statistics.counts.all;
        }

        /* Update total number of issues */
        changeIssuesSum(totalIssues);
      })
    ).catch(errors => {
      console.log(errors.toJSON());
    })
  }

  /* Retrieves commit data for all members */
  const commitsApiRequest = () => {

    axios
      .get(
        "https://gitlab.com/api/v4/projects/21349576/repository/contributors"
      )
      .then((response) => {
        const allCommits: CommitsInfo[] = response.data;

        let totalCommits = 0;

        /* Iterate over all elements in the array and assign
        each member to their number of commits */
        for (let elem of allCommits) {
          for (let i = 0; i < membersCopy.length; i++) {
            if (elem.email === membersCopy[i].email) {
              membersCopy[i].commits = elem.commits;
              totalCommits += elem.commits;
              break;
            }
          }
        }

        /* Update total number of commits */
        changeCommitsSum(totalCommits);

        /* Update members array once with all changes */
        changeMembers(old => {
          return [...membersCopy]
        });
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }
  
  /* Retrieve Gitlab data from these function calls */
  useEffect(() => {
    issuesApiRequest();
    commitsApiRequest();
  }, []);

  return (

    <div className="About">
      <Navbar />

      <div className="About-body">
        <div className="h3_about">
          <h3>About Us</h3>
        </div>

        <div className="purpose">
          Burnin’ Up aims to educate people on the climate crisis of our planet, and make them aware of how quickly our home is changing.
          This website will allow you to navigate from city to city, or country to country, to see how each city or country is contributing to,
          or has been affected by climate change. You can also see how climate change has been affecting the world on a year by year basis.
          We encourage you to take action by making small changes in your life to decrease your individual carbon footprint, such as turning off lights
          you aren’t using, or carpooling with others when you can. By understanding the history of our Earth, we can understand where we will be in the future.

          <br></br>
          
          The compilation of our data allows us to expand our views on climate change to other areas of the world. 
          We often only hear about the state of our environment within our own countries or regions. The visualizations and graphs 
          we show help us understand how drastic the changes are throughout history.
        </div>

        <br></br>
        <div className="h2_about">
          {commitsSum === -1? <h2>Total Commits: </h2> :
          <h2>Total Commits: {commitsSum}</h2> }

          {issuesSum === -1? <h2>Total Issues: </h2> :
          <h2>Total Issues: {issuesSum}</h2> }

          <h2>Total Unit Tests: {unittestsSum}</h2>
        </div>

        <div className="row">
          <div className="h2_about">
            <div className="columnsAbout">
              <Image
                src={CatilinLien}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Caitlin Lien</b>
              </h2>
              <p>Issues: {members[0].issues}</p>
              <p>Commits: {members[0].commits}</p>
              <p>Unit Tests: 4</p>

              <p>Caitlin is a junior from Round Rock, TX. She works on backend development for the site
              and enjoys Data Science and Machine Learning. Her hobbies includes baking, playing video games,
                 and taking group stretch breaks.</p>
            </div>
            <div className="columnsAbout">
              <Image
                src={CaitlinOCallaghan}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Caitlin O'Callaghan</b>
              </h2>
              <p>Issues: {members[1].issues}</p>
              <p>Commits: {members[1].commits}</p>
              <p>Unit Tests: 10</p>
              <p>Caitlin is a junior from Dallas, TX. Some of her technical interests are
              front end web and app development and NLP. Her hobbies include painting
                and drawing, playing oboe, listening to classical music, and drinking tea.</p>

            </div>
            <div className="columnsAbout">
              <Image
                src={CherrySun}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Cherry Sun</b>
              </h2>
              <p>Issues: {members[2].issues}</p>
              <p>Commits: {members[2].commits}</p>
              <p>Unit Tests: 45</p>

              <p>Cherry aged at least 5 years from doing this project. She’s working on backend and has
              interest in overall full stack app development. She likes
                working out, swimming, getting a massage, going to spa and just enjoying life. </p>
            </div>
            <div className="columnsAbout">
              <Image
                src={LaurenMangibin}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Lauren Mangibin</b>
              </h2>
              <p>Issues: {members[3].issues}</p>
              <p>Commits: {members[3].commits}</p>
              <p>Unit Tests: 10</p>
              <p>Lauren is Junior from Austin, TX whose eyebags got much bigger from sleeping late. She is working on the front end of the site and loves working with people.
                She is a hip-hop dancer and choreographer for UT dance teams and loves to explore and hike.</p>

            </div>
            <div className="columnsAbout">
              <Image
                src={SamanthaTuapen}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Samantha Tuapen</b>
              </h2>
              <p>Issues: {members[4].issues}</p>
              <p>Commits: {members[4].commits}</p>
              <p>Unit Tests: 32</p>
              <p>Samantha is a junior from Dallas, TX. She’s working on the backend development of
              this site and has an interest in overall full stack app development. Outside of the CS world, she enjoys journaling,
                 kickboxing, playing musical instruments, and eating good food.</p>
            </div>
            <div className="columnsAbout">
              <Image
                src={UmaSethuraman}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Uma Sethuraman</b>
              </h2>
              <p>Issues: {members[5].issues}</p>
              <p>Commits: {members[5].commits}</p>
              <p>Unit Tests: 4</p>
              <p>Uma is a junior from Houston, TX. She is working on the frontend development for this project. Some of her other technical
              interests include mobile development and machine learning.
                She also enjoys dancing and cooking.</p>
            </div>
          </div>
        </div>

        <div className="h2_about">
          <br></br>
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

          <li><a href="https://developers.google.com/places/web-service/photos">Google Places API: </a> Used to get images of the cities and countries.</li>
          <li><a href="https://developers.google.com/maps/documentation/javascript/overview">Google Geo Location API: </a> Used to map cities and countries.</li>
          <li><a href="https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries">World Bank API: </a> Used to get general information on countries.</li>
          <li><a href="https://public.opendatasoft.com/explore/dataset/worldcitiespop/api/?disjunctive.country&sort=population">OpenDataSoft WorldCitiesPop API: </a> Used to get the general information of cities.</li>
          <li><a href="https://developers.google.com/maps/documentation/geocoding/overview">Google Geocoding API: </a> Used to get latitude and longitude of cities.</li>
          <li><a href="https://aqicn.org/api/">Air Quality Programmatic API: </a> Used to get air quality data on different cities.</li>
          <li><a href="https://global-warming.org/">Global Warming API: </a> Used to get climate data for temperature anomalies.</li>
          <li><a href="https://data.giss.nasa.gov/modelforce/ghgases/Fig1A.ext.txt
ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_annmean_mlo.txt">Carbon Emissions Dataset: </a> Used to get global carbon emissions from 1880-2019.</li>
          <li><a href="ftp://aftp.cmdl.noaa.gov/products/trends/ch4/ch4_annmean_gl.txt">Methane Dataset: </a> Used to get global methane levels from 1880-2019.</li>
          <li><a href="ftp://ftp.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/law/law2006.txt
https://www.epa.gov/sites/production/files/2016-08/ghg-concentrations_fig-3.csv">Nitrous Oxide Dataset: </a> Used to get global nitrous oxide levels from 1880-2019.</li>
          <li><a href="https://nsidc.org/data/g10010">Polar Ice Dataset: </a> Used to get polar ice extent from 1880-2019.</li>
          <li><a href="https://www.jpl.nasa.gov/edu/teach/activity/graphing-sea-level-trends/">Sea Level Dataset: </a> Used to get global sea levels from 1800-2018.</li>
          <li><a href="https://ourworldindata.org/world-population-growth">World Population Dataset: </a> Used to get the world population from 1800-2019.</li>
          </div>
        </div>
        <br></br>
      </div>
      
      <div className="Tools">
        <h2>Tools</h2>
        <div className="Toolcolumn">
          <a href="https://reactjs.org/" >
            <Image className="ToolImage" src={ReactLogo} />
          </a>
          <figcaption className="caption">React: renders website and connects user-interface to backend </figcaption>
        </div>

        <div className="Toolcolumn">
          <a href="https://react-bootstrap.github.io/" >
            <Image className="ToolImage" src={ReactBootstrapLogo} />
          </a>
          <figcaption className="caption">ReactBootstrap: CSS framework for website </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://aws.amazon.com/elasticbeanstalk/" >
            <Image className="ToolImage" src={ElasticBeanstalkLogo} />
          </a>
          <figcaption className="caption">AWS Elastic Beanstalk: hosts website from Git Repository </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.postman.com/" >
            <Image className="ToolImage" src={PostmanLogo} />
          </a>
          <figcaption className="caption">Postman: create Burnin' Up API </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.gitlab.com/" >
            <Image className="ToolImage" src={GitlabLogo} />
          </a>
          <figcaption className="caption">GitLab: holds repository</figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.namecheap.com/" >
            <Image className="ToolImage" src={NameCheapLogo} />
          </a>
          <figcaption className="caption">NameCheap: website name </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.discord.com/" >
            <Image className="ToolImage" src={DiscordLogo} />
          </a>
          <figcaption className="caption">Discord: group communication </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://jupyter.org/" >
            <Image className="ToolImage" src={JupyterNotebookLogo} />
          </a>
          <figcaption className="caption">Jupyter Notebook: used to parse data</figcaption>
        </div>
      </div>
    </div>
  );
}

export interface GroupMember {
  name: string;
  email: string;
  username?: string;
  bio?: string;
  commits?: number;
  issues?: number;
  unittest?: number;
}

export interface Gitlab {
  data: Data;
  status: number;
  statusText: string;
  headers: GITLABHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  url: string;
  method: string;
  headers: ConfigHeaders;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Data {
  statistics: Statistics;
}

export interface Statistics {
  counts: Counts;
}

export interface Counts {
  all: number;
  closed: number;
  opened: number;
}

export interface CommitsInfo {
  name: string;
  email: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface GITLABHeaders {
  "cache-control": string;
  "content-type": string;
}

export interface Request { }

export default About;
