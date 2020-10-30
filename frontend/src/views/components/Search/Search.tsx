import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-dom';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import { connectStateResults } from "react-instantsearch-dom";
import "./Search.css";

/* Creating search client for our Algolia search application */
const searchClient = algoliasearch(
  '55BA5YQNJQ',
  '0fb7c07cd58d91990a6ca879e44885e5'
);

/* What is displayed for each city in search results */
const CityHit = (hit: any) =>
  <div className="hit">
    <a href={"/cities/id="+hit.hit.city_id} >
        <h1>{hit.hit.city_name}</h1>
    </a>
    <p>Name: {hit.hit.city_name}</p>
    <p>Country: {hit.hit.country_iso2code}</p>
    <p>Population: {hit.hit.population}</p>
    <p>PM10: {hit.hit.pm10}</p>
    <p>O3: {hit.hit.o3}</p>
    <p>PM2.5: {hit.hit.pm25}</p>
  </div>

/* Displays element for resulting city when user types in query */
const CityContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
    <div className = "content">
        <Hits hitComponent = {CityHit}/>
    </div>) : null
);

/* What is displayed for each country in search results */
const CountryHit = (hit: any) =>
    <div className="hit">
    <a href={"/countries/id="+hit.hit.country_id} >
        <h1>{hit.hit.country_name}</h1>
    </a>
    <p>Name: {hit.hit.country_name}</p>
    <p>Capital City: {hit.hit.country_capital_city}</p>
    <p>ISO2 Code: {hit.hit.country_iso2code}</p>
    <p>ISO3 Code: {hit.hit.country_iso3code}</p>
    <p>Region: {hit.hit.country_region}</p>
    <p>Highest Annual CO2 Emission Level: {hit.hit.highest_emission}</p>
    <p>Income Level: {hit.hit.income_level}</p>
    <p>Latitude: {hit.hit.lat}</p>
    <p>Longitude: {hit.hit.long}</p>
    <p>Recent CO2 Emissions: {hit.hit.recent_emissions}</p>
    </div>

/* Displays element for resulting country when user types in query */
const CountryContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
    <div className = "content">
        <Hits hitComponent = {CountryHit}/>
    </div>) : null
);

/* What is displayed for each year in search results */
const YearHit = (hit: any) =>
    <div className="hit">
    <a href={"/years/name="+hit.hit.year_name} >
        <h1>{hit.hit.year_name}</h1>
    </a>   
    <p>Year: {hit.hit.year_name}</p>
    <p>CO2: {hit.hit.co2}</p>
    <p>Methane: {hit.hit.methane}</p>
    <p>Nitrous Oxide: {hit.hit.nitrous_oxide}</p>
    <p>Polar Ice Extent: {hit.hit.polar_ice}</p>
    <p>Sea Level: {hit.hit.sea_level}</p>
    <p>Temp Anomaly: {hit.hit.temp_anomaly}</p>
    <p>Top 10 Countries: {hit.hit.top_10_countries}</p>
    <p>World Population : {hit.hit.world_population}</p>
    </div>

/* Displays element for resulting year when user types in query */
const YearContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
    <div className = "content">
        <Hits hitComponent = {YearHit}/>
    </div>) : null
);

function Search() {
  return (
    <div className="Search">
      <InstantSearch
        indexName="cities_index"
        searchClient={searchClient}
      >
        <SearchBox />

        {/* Index containing all cities data */}
        <Index indexName="cities_index">
          <h2>Cities</h2>
          <p>Learn about climate change in cities around the world. </p>
          <br />
          <main>
            <CityContent />
          </main>
        </Index>

        {/* Index containing all countries data */}
        <Index indexName="country_index">
          <h2>Countries</h2>
          <p>Learn about climate change in countries around the world. </p>
          <main>
            <CountryContent />
          </main>
        </Index>

        {/* Index containing all years data */}
        <Index indexName="years_index">
          <h2>Years</h2>
          <p>Learn about climate change across the years. </p>
          <main>
            <YearContent />
          </main>
        </Index>

      </InstantSearch>
    </div>
  );
}

export default Search;