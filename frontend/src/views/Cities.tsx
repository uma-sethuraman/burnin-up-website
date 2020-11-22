import React from "react";
import "./Cities.css";
import Navbar from "./components/OurNavbar";
import { CityObject, City } from "./components/City/CityInstance";
import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import Loading from "./components/Loading";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import WebFont from "webfontloader";
import CitiesTable from "./components/CitiesTable/CitiesTable"

/* general cities model page (route: "/cities") */
const Cities = () => {
  /* array of all cities retrieved from api */
  const [cities, setCities] = useState<City[]>([]);

   /* text passed into search bar */
   const [search_text, setSearchText] = useState<string>("");

   /* reference for search bar input */
   const text_input: any = React.useRef();
  

  /* loads api data into data */
  const [{ data, loading, error }] = useAxios("/api/cities");

  /* if request returns error, redirect to 404 page */
  if (error) {
    window.location.assign("/404");
  }
  /* fills the cities array with the correct values retrieved from data */
  useEffect(() => {
    const cityObj: CityObject = data as CityObject;
    if (cityObj) {
      setCities(cityObj.cities);
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
        "Prompt"
      ],
    },
  });

  return (
    <div className="Cities">
      <Navbar />
      {/* display loading animation if data is still loading */}
      {loading ? <Loading /> : (
        <div>
          {/* image header */}
          <header className="Cities-header">
            <div className="Cities-h1">
              <h1 className="Cities-h1">Cities </h1>
            </div>
            <br />

            {/* cities search bar */}
            <Form
              inline
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FormControl
                className="mr-sm-2"
                type="text"
                placeholder="Search Cities"
                ref={text_input}
                onKeyPress={(event: any) => {
                  if (event.key === "Enter") {
                    searchOnClick(false); /* save search input */
                  }
                }}
              />

              {/* search and clear buttons */}
              <Button style={styles.searchButton} variant="info" onClick={() => searchOnClick(false)}>
                <AiOutlineSearch />
              </Button>
              
              <Button style={styles.searchButton} variant="info" onClick={() => searchOnClick(true)}>
                <AiOutlineClose />
              </Button>
            </Form>
            <br />
              <div className="instructions">
                <p>Select row to learn more!</p>
                <p>Click filter icon in table toolbar to filter.</p>
                <p>Click column name to sort by attribute.</p>
              </div>
            <br/>
            </header>

            {/* displaying the table of all cities, 
            with searching and pagination */}
            <CitiesTable 
              citiesArray={cities}
              searchQuery={search_text} />
        </div>
      )}
    </div>
  );
};

export default Cities;