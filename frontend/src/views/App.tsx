import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import LandingPage from './components/LandingPage/LandingPage';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  '55BA5YQNJQ',
  '0fb7c07cd58d91990a6ca879e44885e5'
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <InstantSearch
        indexName="prod_BURNINUP"
        searchClient={searchClient}
      >
        {/* Widgets */}
      </InstantSearch>
      <LandingPage />
    </div>
  );
}

export default App;