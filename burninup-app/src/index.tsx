import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './index.css';

import * as serviceWorker from './serviceWorker';

//pages
import App from "./views/App";
import About from "./views/About";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/landing" render={(props) => <App />} />
      <Route
        path="/about"
        render={(props) => <About />}
      />
      <Redirect to="/landing" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
