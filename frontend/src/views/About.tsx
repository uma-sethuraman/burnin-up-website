import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState } from "react";

function About() {
  const [stat, changeStat] = useState(-1);
  function ApiRequest() {
    axios
      .get(
        "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinlien"
      )
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then((r) => {
        const stats: Gitlab = JSON.parse(JSON.stringify(r)) as Gitlab;
        console.log(stats.data.statistics.counts.all);
        changeStat(stats.data.statistics.counts.closed);
      });
  }

  return (
    <div className="App">
      {ApiRequest()}
      <Navbar />
      <header className="App-header">
        <h1> THIS IS THE ABOUT PAGE </h1>
        <h4>Caitlin Lien</h4>
        <h1>{stat}</h1>

        {/* <div>
          <Get url="https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=caitlinlien">
            {(error, response, isLoading, makeRequest, axios) => {
              if (error) {
                return (
                  <div>
                    Something bad happened: {error.message}{" "}
                    <button
                      onClick={() => makeRequest({ params: { reload: true } })}
                    >
                      Retry
                    </button>
                  </div>
                );
              } else if (isLoading) {
                return <div>Loading...</div>;
              } else if (response !== null) {
                return (
                  <div>
                    {response.data.message}{" "}
                    <button
                      onClick={() => makeRequest({ params: { refresh: true } })}
                    >
                      Refresh
                    </button>
                  </div>
                );
              }
              return <div>Default message before request is made.</div>;
            }}
          </Get> 
        </div> */}
        <h4>Caitlin O'Callaghan</h4>
        <h4>Cherry Sun</h4>
        <h4>Lauren Mangibin</h4>
        <h4>Samantha Tuapen</h4>
        <h4>Uma Sethuraman</h4>
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
