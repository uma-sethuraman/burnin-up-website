import React from "react";
import "./About.css";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import CountryAPI from './CountryAPI'

function About() {

  /* Commits per contributor from GitLab API */
  const [commitsCL, changeCommitsCL] = useState(-1);
  const [commitsCO, changeCommitsCO] = useState(-1);
  const [commitsCS, changeCommitsCS] = useState(-1);
  const [commitsLM, changeCommitsLM] = useState(-1);
  const [commitsST, changeCommitsST] = useState(-1);
  const [commitsUS, changeCommitsUS] = useState(-1);

  /* Statistics for GitLab Issues from GitLab API */
  const [statsCL, changeStatsCL] = useState(-1);
  const [statsCO, changeStatsCO] = useState(-1);
  const [statsCS, changeStatsCS] = useState(-1);
  const [statsLM, changeStatsLM] = useState(-1);
  const [statsST, changeStatsST] = useState(-1);
  const [statsUS, changeStatsUS] = useState(-1);

  /* Retrieves data about GitLab issues per contributor */
  function issuesApiRequest() {

    /* Requests for all contributors */
    const reqCL = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinlien");
    const reqCO = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinocallaghan");
    const reqCS = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=cherrysun9");
    const reqLM = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=lauren.mangibin");
    const reqST = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=samantha3pen");
    const reqUS = axios.get("https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=uma-sethuraman");
    
    /* Change statistics variables for all contributors */
    axios.all([reqCL, reqCO, reqCS, reqLM, reqST, reqUS]).then(axios.spread((...responses) => {
      const responseCL: Gitlab = JSON.parse(JSON.stringify(responses[0])) as Gitlab;
      changeStatsCL(responseCL.data.statistics.counts.all);
      const responseCO: Gitlab = JSON.parse(JSON.stringify(responses[1])) as Gitlab;
      changeStatsCO(responseCO.data.statistics.counts.all);
      const responseCS: Gitlab = JSON.parse(JSON.stringify(responses[2])) as Gitlab;
      changeStatsCS(responseCS.data.statistics.counts.all);
      const responseLM: Gitlab = JSON.parse(JSON.stringify(responses[3])) as Gitlab;
      changeStatsLM(responseLM.data.statistics.counts.all);
      const responseST: Gitlab = JSON.parse(JSON.stringify(responses[4])) as Gitlab;
      changeStatsST(responseST.data.statistics.counts.all);
      const responseUS: Gitlab = JSON.parse(JSON.stringify(responses[5])) as Gitlab;
      changeStatsUS(responseUS.data.statistics.counts.all);
    })).catch(errors => {
      console.log(errors.toJSON());
    })
  }

  /* Retrieves number of commits per contributor from GitLab API */
  const commitsApiRequest = () => {
    axios
      .get(
        "https://gitlab.com/api/v4/projects/21349576/repository/contributors"
      )
      .then((response) => {
        const allCommits: CommitsInfo[] = response.data;

        /* Iterate over all elements in the array and assign
        each person's variable to their number of commits */
        for (let elem of allCommits) {
          if (elem.email === "caitlinlien@utexas.edu")
            changeCommitsCL(elem.commits);
          if (elem.email === "caitlinocallaghan@Caitlins-MBP.lan")
            changeCommitsCO(elem.commits);
          if (elem.email === "cherrysun9@utexas.edu")
            changeCommitsCS(elem.commits);
          if (elem.email === "lauren.mangibin@gmail.com")
            changeCommitsLM(elem.commits);
          if (elem.email === "samtuapen@utexas.edu")
            changeCommitsST(elem.commits);
          if (elem.email === "uma.sethuraman@utexas.edu")
            changeCommitsUS(elem.commits);
        }
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
  };

  return (
    <div className="About">
      {commitsApiRequest()}
      {issuesApiRequest()}
      <Navbar />
      <body className="About-body">
        <div className = "h3_about">
          <h3>About Us</h3>
        </div>
        <div className="row">
          <div className="h2_about">
            <div className="column">
              <Image src={require("../assets/CaitlinLien.JPG")} height="250" roundedCircle/>
              <h2><b>Caitlin Lien</b></h2>
              <p>Issues: {statsCL}</p>
              <p>Commits: {commitsCL}</p>
              <p>Unit Tests: 0</p>
            </div>
            <div className="column">
              <Image src={require("../assets/caitlin-o-headshot.jpeg")} height="250" roundedCircle/>
              <h2><b>Caitlin O'Callaghan</b></h2>
              <p>Issues: {statsCO}</p>
              <p>Commits: {commitsCO}</p>
              <p>Unit Tests: 0</p>
            </div>
            <div className="column">
              <Image src={require("../assets/cherry.jpeg")} height="250" roundedCircle/>
              <h2><b>Cherry Sun</b></h2>
              <p>Issues: {statsCS}</p>
              <p>Commits: {commitsCS}</p>
              <p>Unit Tests: 0</p>
            </div>
            <div className="column">
              <Image src={require("../assets/LaurenMangibin-headshot.jpg")} height="250" roundedCircle/>
              <h2><b>Lauren Mangibin</b></h2>
              <p>Issues: {statsLM}</p>
              <p>Commits: {commitsLM}</p>
              <p>Unit Tests: 0</p>
            </div>
            <div className="column">
              <Image src={require("../assets/samantha-headshot.jpg")} height="250" roundedCircle/>
              <h2><b>Samantha Tuapen</b></h2>
              <p>Issues: {statsST}</p>
              <p>Commits: {commitsST}</p>
              <p>Unit Tests: 0</p>
            </div>
            <div className="column">
              <Image src={require("../assets/uma-headshot.jpg")} height="250" roundedCircle/>
              <h2><b>Uma Sethuraman</b></h2>
              <p>Issues: {statsUS}</p>
              <p>Commits: {commitsUS}</p>
              <p>Unit Tests: 0</p>
            </div>
          </div>
        </div>
        <div className = "h2_about"> 
          <br></br>
          <h2><a href = "https://documenter.getpostman.com/view/12123261/TVRdAWse">Our Postman API</a></h2>
          <br></br>
          <h2><a href = "https://gitlab.com/caitlinlien/cs373-sustainability/">Our GitLab Repository</a></h2>
          <br></br>
        </div>
      </body>
      <CountryAPI/> 
    </div>
  );
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
  name:      string;
  email:     string;
  commits:   number;
  additions: number;
  deletions: number;
}

export interface GITLABHeaders {
  "cache-control": string;
  "content-type": string;
}

export interface Request {}

export default About;
