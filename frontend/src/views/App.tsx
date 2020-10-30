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

const searchClient = algoliasearch(
  '55BA5YQNJQ',
  '0fb7c07cd58d91990a6ca879e44885e5'
);

// const Hit = (hit:any) =>
//   <div className="hit">
//     <div className = "hitName">
//       <Highlight attribute = "city_name" hit = {hit.city_name}/>
//     </div>
//   </div>

// const Content = () =>
//   <div className = "content">
//     {/* {console.log(Hit)} */}
//     <Hits/>
//     {/* <Hits hitComponent = {Hit}/> */}
//   </div>

function App() {
  return (
    <div className="App">
      <Navbar />
      <InstantSearch
        indexName="cities_index"
        searchClient={searchClient}
      >
        <SearchBox />
        <Hits />
      </InstantSearch>
      <LandingPage />
    </div>
  );
}

export default App;