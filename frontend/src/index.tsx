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
import About from "./views/About";
import Cities from "./views/Cities";
import CityInstance from "./views/components/City/CityInstance";
import GeneralYears from "./views/GeneralYears";
import Countries from "./views/Countries";
import CountryInstance from "./views/components/Country/CountryInstance";
import YearInstance from "./views/components/Year/YearInstance";
import Search from "./views/components/Search/Search";
import Invalid from "./views/components/Invalid";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/about" exact component={About} />
      <Route path="/" exact component={App} />
      <Route path="/cities" exact component={Cities} />
      <Route
        path="/cities/id=:id"
        render={(props) => <CityInstance id={props.match.params.id} />}
      />
      <Route path="/city" exact component={CityInstance} />
      <Route path="/countries" exact component={Countries} />
      <Route
        path="/countries/id=:id"
        render={(props) => <CountryInstance id={props.match.params.id} />}
      />
      <Route
        path="/years/id=:id"
        render={(props) => <YearInstance id={props.match.params.id} />}
      />
      <Route path="/years" exact component={GeneralYears} />
      <Route
        path="/search/q=:q"
        render={(props) => <Search q={props.match.params.q} />}
      />

      <Route path="/404" component={Invalid} />
      {/* redirect to 404 page for invalid urls */}
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
