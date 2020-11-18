import React from "react";
import "./GeneralYears.css";
import Navbar from "./components/OurNavbar";
import { Year, YearsObject } from "./components/Year/YearInstance";
import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import Loading from "./components/Loading";
import WebFont from "webfontloader";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import YearsTable from "./components/YearsTable/YearsTable";

/* general years model page (route: "/years") */
const GeneralYears = () => {
  const [years, setYears] = useState<Year[]>([]);

  /* text passed into search bar */
  const [search_text, setSearchText] = useState<string>("");

  /* reference for search bar input */
  const text_input: any = React.useRef();

  /* get years from api */
  const [{ data, loading, error }] = useAxios("/api/years");

  /* if request returns error, redirect to 404 page */
  if (error) {
    window.location.assign("/404");
  }

  /* set years data */
  useEffect(() => {
    const yearsObj: YearsObject = data as YearsObject;
    if (yearsObj) {
      setYears(yearsObj.years as Year[]);
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
    <div className="GeneralYears">
      <Navbar />

      {/* if it's loading display spinner animation */}
      {loading ? (<Loading/>) : 
        (
        <div>
          <header className="Years-header">
            <div className = "Years-h1">
              <h1 className="Years-h1">Annual Global<br />Climate Change</h1>
            </div>

            {/* years search bar */}
            <Form
                inline
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
              <FormControl
                className="mr-sm-2"
                type="text"
                placeholder="Search Years"
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
          </header>
          {/* years table with all years instances displayed*/}
          <YearsTable
            yearsArray={years}
            searchQuery={search_text} />
        </div>
      )}
    </div>
  );
};

export default GeneralYears;
