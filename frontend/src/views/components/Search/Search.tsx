import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Index, InstantSearch } from "react-instantsearch-dom";
import { SearchBox, Highlight, connectHits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";
import "./Search.css";
import Navbar from "../OurNavbar";
import Image from "react-bootstrap/image";
import WebFont from "webfontloader";
import SearchCityCard from "./SearchCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

/* creating search client for our Algolia search application */
const searchClient = algoliasearch(
  "55BA5YQNJQ",
  "0fb7c07cd58d91990a6ca879e44885e5"
);

/* what is displayed for each city in search results */
const CityHit = (hit: any) => (
  // <div className="hit">
  <div className="search-side-by-side">
  <div>
    {/* <div className="search-columns"> */}
    <SearchCityCard hit={hit.hit} />
    {/* </div> */}
    {/* <div className="result-style">
    <a href={"/cities/id=" + hit.hit.city_id}>
      <h1>{hit.hit.city_name}</h1>
    </a>
    <p>
      Name: {" "}
      <Highlight attribute="city_name" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Country: {" "}
      <Highlight attribute="country_name" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Population: {" "}
      <Highlight attribute="population" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      PM10: {" "}
      <Highlight attribute="pm10" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      O3: {" "}
      <Highlight attribute="o3" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      PM2.5: {" "}
      <Highlight attribute="pm25" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Highest Annual Temperature: {" "}
      <Highlight attribute="highest_temp" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Year of Highest Annual Temperature: {" "}
      <Highlight attribute="year_highest" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Latitude: {" "}
      <Highlight attribute="latitude" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Longitude: {" "}
      <Highlight attribute="longitude" tagName="mark" hit={hit.hit} />
    </p>
    </div> */}
  </div>
  <div>
    Hello
  </div>
  </div>
);

/* displays element for resulting city when user types in query */
const CityContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomCityHits />
    </div>
  ) : null
);

const CityHits = ({ hits }) => (
  <div className="row">
    {hits.map(hit => (
      <div className="columns">
        <SearchCityCard hit={hit}/>
      </div>
    ))}
  </div>
);

const CustomCityHits = connectHits(CityHits)

/* what is displayed for each country in search results */
const CountryHit = (hit: any) => (
  <div className="hit">
    <div className="result-style">
    <a href={"/countries/id=" + hit.hit.country_id}>
      <h1>{hit.hit.country_name}</h1>
    </a>
    <p>
      Name: {" "}
      <Highlight attribute="country_name" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Capital City: {" "}
      <Highlight
        attribute="country_capital_city"
        tagName="mark"
        hit={hit.hit}
      />
    </p>
    <p>
      ISO2 Code: {" "}
      <Highlight attribute="country_iso2code" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      ISO3 Code: {" "}
      <Highlight attribute="country_iso3code" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Region: {" "}
      <Highlight attribute="country_region" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Population: {" "}
      <Highlight attribute="country_population" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Highest Annual CO2 Emission Level: {" "}
      <Highlight attribute="highest_emission" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Year of Highest Annual CO2 Emission Level: {" "}
      <Highlight attribute="high_year" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Income Level: {" "}
      <Highlight attribute="income_level" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Latitude: {" "}
      <Highlight attribute="lat" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Longitude: {" "}
      <Highlight attribute="long" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Recent CO2 Emissions: {" "}
      <Highlight attribute="recent_emissions" tagName="mark" hit={hit.hit} />
    </p>
    </div>
  </div>
);

/* displays element for resulting country when user types in query */
const CountryContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      {/* <Hits hitComponent={CountryHit} /> */}
    </div>
  ) : null
);

/* what is displayed for each year in search results */
const YearHit = (hit: any) => (
  <div className="hit">
    <div className="result-style">
    <a href={"/years/id=" + hit.hit.year_id}>
      <h1>{hit.hit.year_id}</h1>
    </a>
    <p>
      Year: {" "}
      <Highlight attribute="year_id" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      CO2: {" "}
      <Highlight attribute="co2" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Methane: {" "}
      <Highlight attribute="methane" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Nitrous Oxide: {" "}
      <Highlight attribute="nitrous_oxide" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Polar Ice Extent: {" "}
      <Highlight attribute="polar_ice" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Absolute Sea Level Change Since 1880: {" "}
      <Highlight attribute="sea_level" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      Temperature Anomaly: {" "}
      <Highlight attribute="temp_anomaly" tagName="mark" hit={hit.hit} />
    </p>
    <p>
      World Population: {" "}
      <Highlight attribute="world_population" tagName="mark" hit={hit.hit} />
    </p>
    <p>Top 10 Countries:</p>
    <div className="list-item">
      <ul>
        {hit.hit.countries_emissions.map((country_elem: any, index: any) => (
          <li key={country_elem?.country_id}>
            <Highlight
              attribute={`countries_emissions[${index}].country`}
              hit={hit.hit}
              tagName="mark"
            />
          </li>
        ))}
      </ul>
    </div>
    <br />
    <p>Top 10 Cities:</p>
    <div className="list-item">
      <ul>
        {hit.hit.city_temperatures.map((city_elem: any, index: any) => (
          <li key={city_elem?.city_id}>
            <Highlight
              attribute={`city_temperatures[${index}].city`}
              hit={hit.hit}
              tagName="mark"
            />
          </li>
        ))}
      </ul>
    </div>
    </div>
  </div>
);

/* displays element for resulting year when user types in query */
const YearContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      {console.log("here")}
      {/* <Hits hitComponent={YearHit} /> */}
    </div>
  ) : null
);

/* takes in query that the user searches and returns search results */
function Search(q: any) {

  WebFont.load({
    google: {
      families: [
        "serif",
        "Raleway",
        "sans-serif",
      ],
    },
  });

  return (
    // <div>
      
      <div className="Search">
      <Navbar />
      
        <h1 className="search-heading">Search Results</h1>
        <br />
        <InstantSearch
          indexName="cities_index"
          searchClient={searchClient}
          searchState={{
            query: q.q,
          }}
        >
          <div style={{ display: "none" }}>
            <SearchBox />
          </div>

          {/* index containing all cities data */}
          <Index indexName="cities_index">
            <h1>Cities</h1>
            <p>Learn about climate change in cities around the world. </p>
            <br />
            <main>
              <CityContent />
            </main>
          </Index>

          {/* index containing all countries data */}
          <Index indexName="country_index">
            <h1>Countries</h1>
            <p>Learn about climate change in countries around the world. </p>
            <br />
            <main>
              <CountryContent />
            </main>
          </Index>

          {/* index containing all years data */}
          <Index indexName="years_index">
            <h1>Years</h1>
            <p>Learn about climate change across the years. </p>
            <br />
            <main>
              <YearContent />
            </main>
          </Index>
        </InstantSearch>
        <div className="search-side-by-side">
          <div>
              Powered by &nbsp;
          </div>
          <div>
            <Image src={require("../../../assets/algolialogo.png")} height="5%" width="5%"/>
          </div>
        </div>
        <br />
      </div>
    // </div>
  );
}

export default Search;
