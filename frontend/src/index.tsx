import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
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
  <BrowserRouter>
    <Switch>
      <Route path="/landing" render={(props) => <App />} />
      <Route path="/countries/USA" render={(props) => <USA />} />
      <Route path="/countries/China" render={(props) => <China />} />
      <Route path="/countries/France" render={(props) => <France />} />
      <Route path="/about" render={(props) => <About />} />
      <Route path="/cities/Beijing" render={(props) => <Beijing />} />
      <Route path="/cities/Paris" render={(props) => <Paris />} />
      <Route path="/cities/Austin" render={(props) => <Austin />} />
      <Route path="/cities" render={(props) => <Cities />} />
      <Route path="/city" render={(props) => <CityInstance />} />
      <Route path="/climatechange/2013" render={(props) => <Year2013 />} />
      <Route path="/climatechange/2014" render={(props) => <Year2014 />} />
      <Route path="/climatechange/2015" render={(props) => <Year2015 />} />
      <Route path="/climatechange" render={(props) => <GeneralYears />} />
      <Route path="/year" render={(props) => <YearInstance />} />
      <Route path="/countries" render={(props) => <Countries />} />
      <Route path="/country" render={(props) => <CountryInstance />} />
      <Route path="/api/country" render={(props) => <CountryAPI />} />
      <Redirect to="/landing" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
