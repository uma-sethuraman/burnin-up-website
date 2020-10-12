import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

//pages
import App from "./views/App";
import About from "./views/About";
import Cities from "./views/Cities";
import CityInstance from "./views/components/City/CityInstance";
import GeneralYears from "./views/GeneralYears";
import Year2013 from "./views/Year2013";
import Year2014 from "./views/Year2014";
import Year2015 from "./views/Year2015";
import Beijing from "./views/Beijing";
import Paris from "./views/Paris";
import Austin from "./views/Austin";
import Countries from "./views/Countries";
import USA from "./views/USA";
import China from "./views/China";
import France from "./views/France";
import CountryAPI from "./views/CountryAPI";
import CountryInstance from "./views/components/Country/CountryInstance";
import YearInstance from "./views/components/Year/YearInstance";

ReactDOM.render(
  <Router>
      <Route path="/about" exact component = {About}/>
      <Route path="/" exact component = {App}/>
      <Route path="/cities" exact component = {Cities} />
      <Route path="/countries" exact component = {Countries} />

 
      {/* <Route path="/landing" exact component = {App}/> */}
      {/* <Route path="/countries/USA" exact component = {USA}/>
      <Route path="/countries/China" exact component = {China} />
      <Route path="/countries/France" exact component = {France} />
      <Route path="/cities/Beijing" exact component = {Beijing />} />
      <Route path="/cities/Paris" exact component = {Paris />} /> */}
      <Route path="/cities/Austin" exact component = {Austin} />
      
      <Route path="/city" exact component = {CityInstance } />
      {/* <Route path="/climatechange/2013" exact component = {Year2013 />} />
      <Route path="/climatechange/2014" exact component = {Year2014 />} />
      <Route path="/climatechange/2015" exact component = {Year2015 />} /> */}
      <Route path="/climatechange" exact component = {GeneralYears} />
      <Route path="/year" exact component = {YearInstance} />
    
      <Route path="/CountryAPI" exact component = {CountryAPI} />

      {/* //add protections later? when removed, all the pages work.. else, all pages
      //redirect to landing page */}
      {/* <Redirect to="/" /> */}
      
  </Router>,
  document.getElementById("root")

  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
