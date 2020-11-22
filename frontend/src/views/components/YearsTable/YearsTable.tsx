import React from "react";
import "./YearsTable.css";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import Highlighter from "react-highlight-words";
import WebFont from "webfontloader";

/* displays table of all years in
years general page */
function YearsTable(props:any) {

    /* custom render for years table elements to allow for
    highlighting of search terms */
    const yearCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => 
        <div>
            <Highlighter
                highlightClassName="highlight-class"
                searchWords={[props.searchQuery]}
                textToHighlight={value+""}>
            </Highlighter>
        </div>
    
    /* all columns of the years table */
    const columns = [
    {
        name: "year_id",
        label: "Year ID",
        options: {
            filter: false,
            sort: false,
            display: "excluded",
        }
    },
    {
      name: "year_id",
      label: "Year",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: [
            "1880-1900",
            "1900-1920",
            "1920-1940",
            "1940-1960",
            "1960-1980",
            "1980-2000",
            "2000-2020",
          ],
          logic(year_id: any, filterVal: any) {
            const show =
              (filterVal.indexOf("1880-1900") >= 0 &&
                year_id >= 1880 &&
                year_id <= 1900) ||
              (filterVal.indexOf("1900-1920") >= 0 &&
                year_id >= 1900 &&
                year_id <= 1920) ||
              (filterVal.indexOf("1920-1940") >= 0 &&
                year_id >= 1920 &&
                year_id <= 1940) ||
              (filterVal.indexOf("1940-1960") >= 0 &&
                year_id >= 1940 &&
                year_id <= 1960) ||
              (filterVal.indexOf("1960-1980") >= 0 &&
                year_id >= 1960 &&
                year_id <= 1980) ||
              (filterVal.indexOf("1980-2000") >= 0 &&
                year_id >= 1980 &&
                year_id <= 2000) ||
              (filterVal.indexOf("2000-2020") >= 0 &&
                year_id >= 2000 &&
                year_id <= 2020);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "temp_anomaly",
      label: "Global Mean Surface Temperature Anomaly",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Positive", "Negative"],
          logic(temp_anomaly: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Positive") >= 0 && temp_anomaly >= 0) ||
              (filterVal.indexOf("Negative") >= 0 && temp_anomaly < 0);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "co2",
      label: "Mean Carbon Dioxide Level (ppm)",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Low CO2 Level", "Medium CO2 Level", "High CO2 Level"],
          logic(co2: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low CO2 Level") >= 0 && co2 < 300) ||
              (filterVal.indexOf("Medium CO2 Level") >= 0 &&
                co2 >= 300 &&
                co2 < 350) ||
              (filterVal.indexOf("High CO2 Level") >= 0 && co2 >= 350);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "methane",
      label: "Methane Level (ppb)",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: [
            "Low Methane Level",
            "Medium Methane Level",
            "High Methane Level",
          ],
          logic(methane: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low Methane Level") >= 0 && methane < 1000) ||
              (filterVal.indexOf("Medium Methane Level") >= 0 &&
                methane >= 1000 &&
                methane < 1500) ||
              (filterVal.indexOf("High Methane Level") >= 0 && methane >= 1500);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "nitrous_oxide",
      label: "Nitrous Oxide Level (ppb)",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: [
            "Low Nitrous Oxide Level",
            "Medium Nitrous Oxide Level",
            "High Nitrous Oxide Level",
          ],
          logic(nitrous_oxide: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Low Nitrous Oxide Level") >= 0 &&
                nitrous_oxide < 290) ||
              (filterVal.indexOf("Medium Nitrous Oxide Level") >= 0 &&
                nitrous_oxide >= 290 &&
                nitrous_oxide < 320) ||
              (filterVal.indexOf("High Nitrous Oxide Level") >= 0 &&
                nitrous_oxide >= 320);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "polar_ice",
      label: "Ice Extent (square km)",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: ["Small Ice Extent", "Medium Ice Extent", "Large Ice Extent"],
          logic(polar_ice: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Small Ice Extent") >= 0 &&
                polar_ice < 23000000) ||
              (filterVal.indexOf("Medium Ice Extent") >= 0 &&
                polar_ice >= 23000000 &&
                polar_ice < 27000000) ||
              (filterVal.indexOf("Large Ice Extent") >= 0 &&
                polar_ice >= 27000000);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },
    {
      name: "sea_level",
      label: "Absolute Sea Level Change Since 1880 (inches)",
      options: {
        setCellHeaderProps: value => 
        ({ style: {fontWeight: 'bold' } }),
        filter: true,
        sort: true,
        /* filtering options */
        filterOptions: {
          names: [
            "Small Sea Level Change",
            "Medium Sea Level Change",
            "Large Sea Level Change",
          ],
          logic(sea_level: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Small Sea Level Change") >= 0 &&
                sea_level < 2) ||
              (filterVal.indexOf("Medium Sea Level Change") >= 0 &&
                sea_level >= 2 &&
                sea_level < 6) ||
              (filterVal.indexOf("Large Sea Level Change") >= 0 &&
                sea_level >= 6);
            return !show;
          },
        },
        /* enable highlighting */
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
            yearCustomBodyRender(value, tableMeta, updateValue)
      },
    },];

    /* options for the years table, initializing OnRowClick
    to redirect to that row's year page during a click */
    const options = {
        filterType: "checkbox" as any,
        onRowClick: (rowData: any) => {
            window.location.assign("/years/id=" + rowData[0]);
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
        <div className="YearsTable">
            {/* displaying the table of all years, 
            with searching and pagination */}
            <div style={styles.table}>
                <MUIDataTable
                    title={
                      <div className="table-title">
                        Annual Climate Change Data
                      </div>
                    }
                    data={props.yearsArray}
                    columns={columns as MUIDataTableColumnDef[]}
                    options={options}
                />
            </div>
        </div>
    );
}

export default YearsTable;