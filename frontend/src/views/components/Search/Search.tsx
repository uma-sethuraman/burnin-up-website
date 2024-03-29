import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Index, InstantSearch } from "react-instantsearch-dom";
import { SearchBox, connectHits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";
import "./Search.css";
import Navbar from "../OurNavbar";
import Image from "react-bootstrap/Image";
import WebFont from "webfontloader";
import SearchCityCard from "./SearchCityCard";
import SearchCountryCard from "./SearchCountryCard";
import SearchYearCard from "./SearchYearCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

/* creating search client for our Algolia search application */
const searchClient = algoliasearch(
  "JLYMGSLKAK",
  "5f470a089f411bfb08d7651de14a2987"
);

/* filter type for search */
enum SearchType {
  Cities,
  Countries,
  Years,
  All,
}

/* custom display of the cities results */
const CityHits = ({ hits }) => (
  <div className="row">
    {hits.map((hit) => (
      <div className="search-columns" key={hit.city_id}>
        <SearchCityCard hit={hit} />
      </div>
    ))}
  </div>
);
const CustomCityHits = connectHits(CityHits);

/* displays element for resulting city when user types in query */
const CityContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomCityHits />
    </div>
  ) : null
);

/* custom display of the countries results */
const CountryHits = ({ hits }) => (
  <div className="row">
    {hits.map((hit) => (
      <div className="search-columns" key={hit.country_id}>
        <SearchCountryCard hit={hit} />
      </div>
    ))}
  </div>
);
const CustomCountryHits = connectHits(CountryHits);

/* displays element for resulting country when user types in query */
const CountryContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomCountryHits />
    </div>
  ) : null
);

/* custom display of the years results */
const YearsHits = ({ hits }) => (
  <div className="row">
    {hits.map((hit) => (
      <div className="search-columns" key={hit.year_id}>
        <SearchYearCard hit={hit} />
      </div>
    ))}
  </div>
);
const CustomYearsHits = connectHits(YearsHits);

/* displays element for resulting year when user types in query */
const YearContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomYearsHits />
    </div>
  ) : null
);

/* takes in query that the user searches and returns search results */
function Search(q: any) {

  /* type of filter and text displayed in dropdown */
  const [filterType, setFilterType] = React.useState<number>(SearchType.All);
  const [filterTitle, setFilterTitle] = React.useState<String>(
    "Filter by Model"
  );

  /* load in fonts */
  WebFont.load({
    google: {
      families: ["serif", "Raleway", "sans-serif"],
    },
  });

  /* when cities filter is clicked */
  function citiesOnClick() {
    setFilterType(SearchType.Cities);
    setFilterTitle("Filter by Cities");
  }

  /* when countries filter is clicked */
  function countriesOnClick() {
    setFilterType(SearchType.Countries);
    setFilterTitle("Filter by Countries");
  }

  /* when years filter is clicked */
  function yearsOnClick() {
    setFilterType(SearchType.Years);
    setFilterTitle("Filter by Years");
  }

  /* when none filter is clicked */
  function noneOnClick() {
    setFilterType(SearchType.All);
    setFilterTitle("Filter by Model");
  }

  return (
    <div className="Search">
      <Navbar singleColor={true} />
      <h1 className="search-heading">SEARCH RESULTS</h1>
      <h2 className="query-style">{q.q}</h2>
      <br />
      {/* display filter dropdown */}
      <DropdownButton id="dropdown-basic-button" title={filterTitle}>
        <Dropdown.Item onClick={citiesOnClick}>Cities</Dropdown.Item>
        <Dropdown.Item onClick={countriesOnClick}>Countries</Dropdown.Item>
        <Dropdown.Item onClick={yearsOnClick}>Years</Dropdown.Item>
        <Dropdown.Item onClick={noneOnClick}>All</Dropdown.Item>
      </DropdownButton>
      <br />
      <InstantSearch
        indexName="cities_index"
        searchClient={searchClient}
        searchState={{query: q.q,}}>

        <div style={{ display: "none" }}><SearchBox /></div>
        {/* index containing all cities data  */}
        <Index indexName="cities_index">
          {filterType === SearchType.Cities ||
          filterType === SearchType.All ? (
            <div>
              <h1 className="section-title">Cities</h1>
              <p className="section-subtitle">
                Learn about climate change in cities around the world.{" "}
              </p><br />
              <main><CityContent /></main>
            </div>) : (<div></div>)}
        </Index>

        {/* index containing all countries data */}
        <Index indexName="country_index">
          {filterType === SearchType.Countries ||
          filterType === SearchType.All ? (
            <div>
              <h1 className="section-title">Countries</h1>
              <p className="section-subtitle">
                Learn about climate change in countries around the world.{" "}
              </p>
              <br />
              <main>{" "}<CountryContent /></main>
            </div>) : (<div></div>)}
        </Index>

        {/* index containing all years data */}
        <Index indexName="years_index">
          {filterType === SearchType.Years || filterType === SearchType.All ? (
            <div>
              <h1 className="section-title">Years</h1>
              <p className="section-subtitle">
                Learn about annual climate change across the years.{" "}
              </p>
              <br />
              <main>{" "}<YearContent /></main>
            </div>) : (<div></div>)}
        </Index>
      </InstantSearch>
      {/* display algolia logo */}
      <div className="search-side-by-side">
        <div>Powered by &nbsp;</div>
        <div>
          <Image
            src={require("../../../assets/algolialogo.png")}
            height="5%"
            width="5%"/>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Search;
