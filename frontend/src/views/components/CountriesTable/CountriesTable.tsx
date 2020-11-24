import React from "react";
import "./CountriesTable.css";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import Highlighter from "react-highlight-words";
import WebFont from "webfontloader";

/* displays table of all countries in
countries general page */
function CountriesTable(props: any) {
  /* custom render for countries table elements to allow for
    highlighting of search terms */
  const countryCustomBodyRender = (
    value: any,
    tableMeta: any,
    updateValue: any
  ) => (
    <div>
      <Highlighter
        highlightClassName="highlight-class"
        searchWords={[props.searchQuery]}
        textToHighlight={value + ""}
      ></Highlighter>
    </div>
  );

  /* all columns of the countries table, with sorting 
  and filtering options set */
  const columns = [
    {
      name: "country_id",
      label: "Country ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "country_name",
      label: "Country",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
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
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "income_level",
      label: "Income Level",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        filterOptions: {
          names: [
            "High Income",
            "Upper Middle Income",
            "Lower Middle Income",
            "Low Income",
          ],
          logic(income_level: any, filterVal: any) {
            const show =
              (filterVal.indexOf("High Income") >= 0 &&
                (income_level === "High income" ||
                  income_level === "High Income")) ||
              (filterVal.indexOf("Upper Middle Income") >= 0 &&
                (income_level === "Upper middle income" ||
                  income_level === "Upper Middle Income")) ||
              (filterVal.indexOf("Lower Middle Income") >= 0 &&
                income_level === "Lower middle income") ||
              (filterVal.indexOf("Low Income") >= 0 &&
                income_level === "Low income");
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "country_region",
      label: "Country Region",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "country_capital_city",
      label: "Capital City",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
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
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "country_population",
      label: "Population",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        filterOptions: {
          names: ["Small Population", "Medium Population", "Large Population"],
          logic(country_population: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Small Population") >= 0 &&
                country_population < 1000000) ||
              (filterVal.indexOf("Medium Population") >= 0 &&
                country_population >= 1000000 &&
                country_population < 100000000) ||
              (filterVal.indexOf("Large Population") >= 0 &&
                country_population >= 100000000);

            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "lat",
      label: "Latitude",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        filterOptions: {
          names: ["Northern Hemisphere", "Southern Hemisphere"],
          logic(lat: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Northern Hemisphere") >= 0 && lat >= 0) ||
              (filterVal.indexOf("Southern Hemisphere") >= 0 && lat < 0);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "long",
      label: "Longitude",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        filterOptions: {
          names: ["Western Hemisphere", "Eastern Hemisphere"],
          logic(lon: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Western Hemisphere") >= 0 && lon < 0) ||
              (filterVal.indexOf("Eastern Hemisphere") >= 0 && lon >= 0);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
    {
      name: "recent_emissions",
      label: "Most Recent CO2 Emissions (ppm)",
      options: {
        setCellHeaderProps: (value) => ({ style: { fontWeight: "bold" } }),
        filter: true,
        sort: true,
        filterOptions: {
          names: ["Low CO2", "Medium CO2", "High CO2"],
          logic(co2: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low CO2 Emissions") >= 0 && co2 < 50) ||
              (filterVal.indexOf("Medium CO2 Emissions") >= 0 &&
                co2 >= 50 &&
                co2 < 100) ||
              (filterVal.indexOf("High CO2 Emissions") >= 0 && co2 >= 100);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
          countryCustomBodyRender(value, tableMeta, updateValue),
      },
    },
  ];

  /* options for the countries table, initializing OnRowClick
    to redirect to that row's country page during a click */
  const options = {
    filterType: "checkbox" as any,
    onRowClick: (rowData: any) => {
      window.location.assign("/countries/id=" + rowData[0]);
    },
    searchText: props.searchQuery /* what is searched for */,
    search: false,
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    viewColumns: false,
  };

  /* table styling */
  const styles = {
    table: {
      display: "table",
      tableLayout: "fixed",
      width: "100%",
    } as React.CSSProperties,
  };

  /* load in fonts */
  WebFont.load({
    google: {
      families: ["Raleway", "Roboto", "Helvetica", "Arial", "sans-serif"],
    },
  });

  return (
    <div className="CountriesTable">
      {/* displaying the table of all countries, 
            with searching and pagination */}
      <div style={styles.table}>
        <MUIDataTable
          title={<div className="table-title">Countries Data</div>}
          data={props.countriesArray}
          columns={columns as MUIDataTableColumnDef[]}
          options={options}
        />
      </div>
    </div>
  );
}

export default CountriesTable;
