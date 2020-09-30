import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState } from "react";

function About() {
  const [stat, changeStat] = useState<Array<number>>([-1, -1, -1, -1, -1, -1]);

  function apiRequest(url: string, index: number) {
    axios
      .get(url)
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then((r) => {
        const stats: Gitlab = JSON.parse(JSON.stringify(r)) as Gitlab;
        let tempArray = stat;
        tempArray[index] = stats.data.statistics.counts.all;
        changeStat(tempArray);
        console.log(stat);
        console.log(tempArray);
      });
  }

  return (
    <div className="App">
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinlien",
        0
      )}
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinocallaghan",
        1
      )}
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=cherrysun9",
        2
      )}
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=lauren.mangibin",
        3
      )}
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=samantha3pen",
        4
      )}
      {apiRequest(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=uma-sethuraman",
        5
      )}
      <Navbar />
      <header className="App-header">
        <h1> THIS IS THE ABOUT PAGE </h1>
        <h4>Caitlin Lien</h4>
        <h1>{stat[0]}</h1>
        <h4>Caitlin O'Callaghan</h4>
        <h1>{stat[1]}</h1>
        <h4>Cherry Sun</h4>
        <h1>{stat[2]}</h1>
        <h4>Lauren Mangibin</h4>
        <h1>{stat[3]}</h1>
        <h4>Samantha Tuapen</h4>
        <h1>{stat[4]}</h1>
        <h4>Uma Sethuraman</h4>
        <h1>{stat[5]}</h1>
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
