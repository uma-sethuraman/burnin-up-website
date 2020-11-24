import React from "react";
import Navbar from "./components/OurNavbar";
import { CountriesObject, Country } from "./components/Country/CountryInstance";
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import "./Countries.css";
import Loading from "./components/Loading";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import WebFont from "webfontloader";
import CountriesTable from "./components/CountriesTable/CountriesTable";

/* general countries model page (route: "/countries") */
const Countries = () => {
  
  /* array of all countries retrieved from api */
  const [countries, setCountries] = useState<Country[]>([]);

  /* text passed into search bar */
  const [search_text, setSearchText] = useState<string>("");

  /* reference for search bar input */
  const text_input: any = React.useRef();

  /* loads api data into data */
  const [{ data, loading, error }] = useAxios('/api/countries')

  /* if request returns error, redirect to 404 page */
  if (error) {
    window.location.assign("/404");
  }
  
  /* fills the countries array with the correct values retrieved from data */
  useEffect(() => {
    const countryObj: CountriesObject = data as CountriesObject;
    if (countryObj) {
      setCountries(countryObj.countries);
    }
  }, [data]);

  const styles = {
    searchButton: {
      backgroundColor: "white", 
      borderColor: "black", 
      color: "black",
    } as React.CSSProperties,
  } 

  /* saves search bar input on "search" click
  or when clicking enter. if clear = true,
  that means user clicked "clear" button so reset
  search text */
  function searchOnClick(clear: boolean) {
    if (clear) {
      setSearchText("");
      text_input.current.value = "";
    }
    else
      setSearchText(text_input.current.value);
  }

  WebFont.load({
    google: {
      families: [
        "Raleway",
      ],
    },
  });

  return (
    <div className="Countries">
      <Navbar />

      {/* display loading animation if data is still loading */}
      {loading ? <Loading/> : 
      <div>
        <header className="Countries-header">
          <div className = "Countries-h1">
            <h1 className="Countries-h1">Countries</h1>
          </div>

          {/* countries search bar */}
          <Form inline onSubmit={(e) => {e.preventDefault();}}>
              <FormControl
                className="mr-sm-2"
                type="text"
                placeholder="Search Countries"
                ref={text_input}
                onKeyPress={(event: any) => {
                  if (event.key === "Enter") {
                    searchOnClick(false); /* save search input */
                  }
                }}
              />

              {/* search and clear buttons */}
              <Button style={styles.searchButton} variant="info" 
              onClick={() => searchOnClick(false)}>
                <AiOutlineSearch />
              </Button>
              
              <Button style={styles.searchButton} variant="info" 
              onClick={() => searchOnClick(true)}>
                <AiOutlineClose />
              </Button>
          </Form>
            <br />
            <div className="instructions">
              <p>Select row to learn more!</p>
              <p>Click filter icon in table toolbar to filter.</p>
              <p>Click column name to sort by attribute.</p>
            </div>
            <br />
          </header>

          {/* displaying table with all country instances */}
          <CountriesTable
            countriesArray={countries}
            searchQuery={search_text} />
        </div>}
    </div>
  );
}

export default Countries;
