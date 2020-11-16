import React from "react";
import "./Cities.css";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import { CityObject, City } from "./components/City/CityInstance";
import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import Spinner from "react-bootstrap/Spinner";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import Highlighter from "react-highlight-words";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

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

  /* custom render for cities table elements to allow for
  highlighting of search terms */
  const cityCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => 
    <div>
      <Highlighter
          highlightClassName="highlight-class"
          searchWords={[search_text]}
          textToHighlight={value+""}>
        </Highlighter>
      </div>

  /* all columns of the cities table */
  const columns = [
    {
      name: "city_id",
      label: "City ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "city_name",
      label: "City",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["A-I", "J-R", "S-Z"],
          logic(city_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A-I") >= 0 &&
                city_name.charCodeAt(0) >= "A".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "I".charCodeAt(0)) ||
              (filterVal.indexOf("J-R") >= 0 &&
                city_name.charCodeAt(0) >= "J".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "R".charCodeAt(0)) ||
              (filterVal.indexOf("S-Z") >= 0 &&
                city_name.charCodeAt(0) >= "S".charCodeAt(0) &&
                city_name.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
          cityCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "country_name",
      label: "Country",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["A-I", "J-R", "S-Z"],
          logic(country_name: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A-I") >= 0 &&
                country_name.charCodeAt(0) >= "A".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "I".charCodeAt(0)) ||
              (filterVal.indexOf("J-R") >= 0 &&
                country_name.charCodeAt(0) >= "J".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "R".charCodeAt(0)) ||
              (filterVal.indexOf("S-Z") >= 0 &&
                country_name.charCodeAt(0) >= "S".charCodeAt(0) &&
                country_name.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
          cityCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "o3",
      label: "O3 (Dobson Units)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low O3", "Medium O3", "High O3"],
          logic(o3: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low O3") >= 0 && o3 < 15) ||
              (filterVal.indexOf("Medium O3") >= 0 && o3 >= 15 && o3 < 30) ||
              (filterVal.indexOf("High O3") >= 0 && o3 >= 30);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
          cityCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "pm10",
      label: "PM10 (ug/m3)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low PM10", "Medium PM10", "High PM10"],
          logic(pm10: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low PM10") >= 0 && pm10 < 20) ||
              (filterVal.indexOf("Medium PM10") >= 0 &&
                pm10 >= 20 &&
                pm10 < 60) ||
              (filterVal.indexOf("High PM10") >= 0 && pm10 >= 60);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
          cityCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "pm25",
      label: "PM2.5 (ug/m3)",
      options: {
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low PM2.5", "Medium PM2.5", "High PM2.5"],
          logic(pm25: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low PM2.5") >= 0 && pm25 < 50) ||
              (filterVal.indexOf("Medium PM2.5") >= 0 &&
                pm25 >= 50 &&
                pm25 < 100) ||
              (filterVal.indexOf("High PM2.5") >= 0 && pm25 >= 100);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
          cityCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "population",
      label: "Population",
      options: {
        filter: true,
        sort: true, 
        /* filtering options */
        filterOptions: {
          names: ["Small Population", "Medium Population", "Large Population"],
          logic(population: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Small Population") >= 0 &&
                population < 500000) ||
              (filterVal.indexOf("Medium Population") >= 0 &&
                population >= 500000 &&
                population < 5000000) ||
              (filterVal.indexOf("Large Population") >= 0 &&
                population >= 5000000);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          value === -1 ? (
            /* for cities without population data */
            cityCustomBodyRender("-", tableMeta, updateValue)
          ): cityCustomBodyRender(value, tableMeta, updateValue),
      },
    },
  ];

  /* options for the cities table, initializing OnRowClick
  to redirect to that row's city page during a click */
  const options = {
    filterType: "checkbox" as any,
    onRowClick: (rowData: any) => {
      window.location.assign("/cities/id=" + rowData[0]);
    },
    searchText: search_text, /* what is searched for */
    search: false,
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
  };

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

  return (
    <div className="Cities">
      <Navbar />
      {/* display loading animation if data is still loading */}
      {loading ? 
        (<div>
          <br /> <br /> <Spinner animation="border" />
        </div>) : (
        <div>
          {/* image header */}
          <header className="Cities-header">
            <div className="Cities-h1">
              <h1 className="Cities-h1">Cities </h1>
            </div>
            <br />
            <div className="side-by-side">
              <Image
                src={require("../assets/filter_icon.png")}
                width="50px"
                fluid
              />

              {/* instructions on how to sort and filter */}
              <p className="p_cities">
                &nbsp;&nbsp;Click this filter icon in the table to filter by any
                column.
              </p>
            </div>
            <p>Click on a column name to sort by that column.</p>

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
              <Button variant="info" onClick={() => searchOnClick(false)}>
                <AiOutlineSearch />
              </Button>
              
              <Button variant="info" onClick={() => searchOnClick(true)}>
                <AiOutlineClose />
              </Button>
            </Form>
            <br />
            </header>

            {/* displaying the table of all cities, 
            with searching and pagination */}
            <div
              style={{ display: "table", tableLayout: "fixed", width: "100%" }}
            >
              <MUIDataTable
                title={<div className="table">Cities Data</div>}
                data={cities}
                columns={columns as MUIDataTableColumnDef[]}
                options={options}
              />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cities;