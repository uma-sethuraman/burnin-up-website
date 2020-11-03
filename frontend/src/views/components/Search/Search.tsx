import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-dom';
import { SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { connectStateResults } from "react-instantsearch-dom";
import "./Search.css";
import Navbar from "../OurNavbar";

/* Creating search client for our Algolia search application */
const searchClient = algoliasearch(
  '55BA5YQNJQ',
  '0fb7c07cd58d91990a6ca879e44885e5'
);

/* What is displayed for each city in search results */
const CityHit = (hit: any) =>
  <div className="hit">
    <a href={"/cities/id=" + hit.hit.city_id} >
      <h1>{hit.hit.city_name}</h1>
    </a>
    <p>
      Name: <Highlight
        attribute="city_name"
        tagName="mark"
        hit={hit.hit}
      />
    </p>
    <p>Country: <Highlight
      attribute="country_name"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Population: <Highlight
      attribute="population"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>PM10: <Highlight
      attribute="pm10"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>O3: <Highlight
      attribute="o3"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>PM2.5: <Highlight
      attribute="pm25"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Highest Annual Temperature: <Highlight
      attribute="highest_temp"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Year of Highest Annual Temperature: <Highlight
      attribute="year_highest"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Latitude: <Highlight
      attribute="latitude"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Longitude: <Highlight
      attribute="longitude"
      tagName="mark"
      hit={hit.hit}
    /></p>
  </div>

/* Displays element for resulting city when user types in query */
const CityContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <div className="content">
        <Hits hitComponent={CityHit} />
      </div>) : null
);

/* What is displayed for each country in search results */
const CountryHit = (hit: any) =>
  <div className="hit">
    <a href={"/countries/id=" + hit.hit.country_id} >
      <h1>{hit.hit.country_name}</h1>
    </a>
    <p>Name: <Highlight
      attribute="country_name"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Capital City: <Highlight
      attribute="country_capital_city"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>ISO2 Code: <Highlight
      attribute="country_iso2code"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>ISO3 Code: <Highlight
      attribute="country_iso3code"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Region: <Highlight
      attribute="country_region"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Population: <Highlight
      attribute="country_population"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Highest Annual CO2 Emission Level: <Highlight
      attribute="highest_emission"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Year of Highest Annual CO2 Emission Level: <Highlight
      attribute="high_year"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Income Level: <Highlight
      attribute="income_level"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Latitude: <Highlight
      attribute="lat"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Longitude: <Highlight
      attribute="long"
      tagName="mark"
      hit={hit.hit}
    /></p>
    <p>Recent CO2 Emissions: <Highlight
      attribute="recent_emissions"
      tagName="mark"
      hit={hit.hit}
    /></p>
  </div>

/* Displays element for resulting country when user types in query */
const CountryContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <div className="content">
        <Hits hitComponent={CountryHit} />
      </div>) : null
);

/* What is displayed for each year in search results */
const YearHit = (hit: any) =>
  <div className="hit">
    <a href={"/years/id=" + hit.hit.year_name} >
      <h1>{hit.hit.year_name}</h1>
    </a>
    <p>Year: <Highlight
      attribute="year_name"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>CO2: <Highlight
      attribute="co2"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Methane: <Highlight
      attribute="methane"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Nitrous Oxide: <Highlight
      attribute="nitrous_oxide"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Polar Ice Extent: <Highlight
      attribute="polar_ice"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Sea Level: <Highlight
      attribute="sea_level"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Temp Anomaly: <Highlight
      attribute="temp_anomaly"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>World Population : <Highlight
      attribute="world_population"
      tagName="mark"
      hit={hit.hit} /></p>
    <p>Top 10 Countries:
    <div className="list-item">
        <ul>
          {hit.hit.top_10_countries.map((country_elem: any, index: any) => (
            <li>
              <Highlight
                attribute={`top_10_countries[${index}].country`}
                hit={hit.hit}
                tagName="mark" />
            </li>
          ))}
        </ul>
      </div>
    </p>
  </div>

/* Displays element for resulting year when user types in query */
const YearContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <div className="content">
        <Hits hitComponent={YearHit} />
      </div>) : null
);

/* Takes in query that the user searches and returns search results */
function Search(q: any) {
  console.log("q.q "+ q.q)

  return (
    <div>
      <Navbar />
      <div className="Search">
        <h1>Search Results</h1>
        <br/>
        <InstantSearch
          indexName="cities_index"
          searchClient={searchClient}
          searchState={{
            query: q.q
          }}
        >
          <div style={{ display: "none" }}>
            <SearchBox />
          </div>

          {/* Index containing all cities data */}
          <Index indexName="cities_index">
            <h1>Cities</h1>
            <p>Learn about climate change in cities around the world. </p>
            <br />
            <main>
              <CityContent />
            </main>
          </Index>

          {/* Index containing all countries data */}
          <Index indexName="country_index">
            <h1>Countries</h1>
            <p>Learn about climate change in countries around the world. </p>
            <br />
            <main>
              <CountryContent />
            </main>
          </Index>

          {/* Index containing all years data */}
          <Index indexName="years_index">
            <h1>Years</h1>
            <p>Learn about climate change across the years. </p>
            <br />
            <main>
              <YearContent />
            </main>
          </Index>

        </InstantSearch>
      </div>
    </div>
  );
}

export default Search;