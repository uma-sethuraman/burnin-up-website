import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import LandingPage from './components/LandingPage/LandingPage';
// import SearchHelper from './helpers';
// global instantsearch;

import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';


function App() {
  const searchClient = algoliasearch('YourApplicationID', '0fb7c07cd58d91990a6ca879e44885e5');

  const search = instantsearch({
    indexName: 'demo_ecommerce',
    searchClient,
  });

  search.addWidgets([
    searchBox({
      container: "#searchbox"
    }),

    hits({
      container: "#hits"
    })
  ]);

  search.start();
  return (
    <div className="App">
      <Navbar />
      {/* <SearchHelper/> */}
      {/* <LandingPage /> */}
    </div>
  );
}

export default App;