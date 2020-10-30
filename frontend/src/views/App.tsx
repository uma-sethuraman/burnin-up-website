import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image";
import LandingPage from './components/LandingPage/LandingPage';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';
import { Hits } from 'react-instantsearch-dom';
import { Highlight } from 'react-instantsearch-dom';
import "./App.css";

const searchClient = algoliasearch(
  '55BA5YQNJQ',
  '0fb7c07cd58d91990a6ca879e44885e5'
);


  const Hit = (hit: any) =>
  <div className="hit">
    <a href={"/cities/id="+hit.hit.city_id} >
        <h1>{hit.hit.city_name}</h1>
        
      </a>
      <p>Name: {} Country: {} Population: {}</p>
    <div className = "hitName">
        <Highlight attribute = "city_name" hit = {hit.hit.city_name}/>
    </div>
  </div>

const Content = () =>
  <div className = "content">
    <Hits hitComponent = {Hit}/>
  </div>

function App() {
  return (
    <div className="App">
      <Navbar />
      <InstantSearch
        indexName="cities_index"
        searchClient={searchClient}
      >
        <SearchBox />
        <main>
          <Content/>
        </main>
      </InstantSearch>
      <LandingPage />
    </div>
  );
}

export default App;