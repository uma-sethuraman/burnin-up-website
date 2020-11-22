import React from "react";
import "./CitiesTable.css";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import Highlighter from "react-highlight-words";
import WebFont from "webfontloader";

/* displays table of all cities in
cities general page */
function CitiesTable(props:any) {

  /* custom render for cities table elements to allow for
  highlighting of search terms */
  const cityCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => 
    <div>
      <Highlighter
          highlightClassName="highlight-class"
          searchWords={[props.searchQuery]}
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          setCellHeaderProps: value => 
          ({ style: {fontWeight: 'bold' } }),
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
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
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
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
    searchText: props.searchQuery, /* what is searched for */
    search: false,
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    viewColumns: false,
  };

  const styles = {
    table: {
      display: "table", 
      tableLayout: "fixed", 
      width: "100%",
    } as React.CSSProperties
  } 

  WebFont.load({
    google: {
      families: [
        "Raleway",
      ],
    },
  });

  return (
    <div className="CitiesTable">
            {/* displaying the table of all cities, 
            with searching and pagination */}
            <div
              style={styles.table}
            >
              <MUIDataTable
                title={
                  <div className="table-title">
                    Cities Data
                  </div>}
                data={props.citiesArray}
                columns={columns as MUIDataTableColumnDef[]}
                options={options}
              />
          </div>
    </div>
  );
};

export default CitiesTable;