import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

/* pages */
import App from "./views/App";
import About from "./views/About/About";
import Cities from "./views/Cities";
import CityInstance from "./views/components/City/CityInstance";
import GeneralYears from "./views/GeneralYears";
import Countries from "./views/Countries";
import CountryInstance from "./views/components/Country/CountryInstance";
import YearInstance from "./views/components/Year/YearInstance";
import Search from "./views/components/Search/Search";
import Invalid from "./views/components/Invalid";
import HowToHelp from "./views/HowToHelp";
import Visuals from "./views/Visualizations";
import ProviderVisualizations from "./views/ProviderVisualizations";

/* sets up routes for all pages on website */
ReactDOM.render(
  <Router>
    <Switch>
      {/* about page */}
      <Route path="/about" exact component={About} />

      {/* landing page */}
      <Route path="/" exact component={App} />

      {/* cities general page */}
      <Route path="/cities" exact component={Cities} />

      {/* city instance page based on city id */}
      <Route
        path="/cities/id=:id"
        render={(props) => <CityInstance id={props.match.params.id} />}
      />

      {/* countries general page */}
      <Route path="/countries" exact component={Countries} />

      {/* country instance page based on country id */}
      <Route
        path="/countries/id=:id"
        render={(props) => <CountryInstance id={props.match.params.id} />}
      />

      {/* years general page */}
      <Route path="/years" exact component={GeneralYears} />

      {/* year instance page based on year id */}
      <Route
        path="/years/id=:id"
        render={(props) => <YearInstance id={props.match.params.id} />}
      />

      {/* search page based on provided query q */}
      <Route
        path="/search/q=:q"
        render={(props) => <Search q={props.match.params.q} />}
      />

      {/* how to help page for resources */}
      <Route path="/howtohelp" exact component={HowToHelp} />

      {/* our visualizations */}
      <Route path="/visualizations" exact component={Visuals} />

      {/* provider visualizations */}
      <Route
        path="/provider-visualizations"
        exact
        component={ProviderVisualizations}
      />

      {/* search page when query is empty */}
      <Route path="/search/q=" render={(props) => <Search q={""} />} />

      {/* redirect to 404 page for invalid urls */}
      <Route path="/404" component={Invalid} />
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
