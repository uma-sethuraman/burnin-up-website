import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
import USA from "./views/USA";
import * as serviceWorker from "./serviceWorker";

//pages
import App from "./views/App";
import About from "./views/About";
import Cities from "./views/Cities";
import GeneralYears from "./views/GeneralYears";
import Year2005 from "./views/Year2005";
import Beijing from "./views/Beijing";
import Paris from "./views/Paris";
import Countries from "./views/Countries";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/landing" render={(props) => <App />} />
      <Route path="/country/USA" render={(props) => <USA />} />
      <Route path="/about" render={(props) => <About />} />
      <Route path="/cities/Beijing" render={(props) => <Beijing />} />
      <Route path="/cities/Paris" render={(props) => <Paris />} />
      <Route path="/cities" render={(props) => <Cities />} />
      <Route path="/climatechange/2005" render={(props) => <Year2005 />} />
      <Route path="/climatechange" render={(props) => <GeneralYears />} />
      <Route path="/countries" render={(props) => <Countries />} />
      <Redirect to="/landing" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
