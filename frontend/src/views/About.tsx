import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState } from "react";

function About() {

  /* Statistics for GitLab Issues */
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

  return (
    <div className="App">
      {issuesApiRequest()}
      <Navbar />
      <header className="App-header">
        <h1> THIS IS THE ABOUT PAGE </h1>
        <h4>Caitlin Lien</h4>
        <p>issues: {statsCL}</p>
        <h4>Caitlin O'Callaghan</h4>
        <p>issues: {statsCO}</p>
        <h4>Cherry Sun</h4>
        <p>issues: {statsCS}</p>
        <h4>Lauren Mangibin</h4>
        <p>issues: {statsLM}</p>
        <h4>Samantha Tuapen</h4>
        <p>issues: {statsST}</p>
        <h4>Uma Sethuraman</h4>
        <p>issues: {statsUS}</p>
      </header>
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

export interface GITLABHeaders {
  "cache-control": string;
  "content-type": string;
}

export interface Request {}

export default About;
