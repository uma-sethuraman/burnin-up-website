import React from "react";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import "./YearInstanceTable.css";

/* displays table of top 10 cities
in the year instance page */
function YearInstanceTable(props: any) {

    /* attributes of the top 10 cities */
    const columns = [
      {
          name: "city_id",
          label: "City ID",
          options: {
              filter: false,
              sort: false,
              display: "excluded",
          }
      },
      {
        name: "city",
        label: "City",
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: "city_temp",
        label: "Annual Average Temperature",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value: any, tableMeta: any, updateValue: any) => 
              <div>
                  {value + (value > 40 ? " °F" : " °C")}
              </div>
        }
      }
    ];

    const options = {
       /* makes a row redirect to city page */
        onRowClick: (rowData: any) => {
            window.location.assign("/cities/id=" + rowData[0]);
        },
        search: false,
        download: false,
        print: false,
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        viewColumns: false,
        filter: false,
        pagination: false
    };

    return (
        <div className="YearsInstanceTable">
          {/* displaying the table of top 10 cities */ }
          <div style={{marginLeft: "10vw", marginRight: '10vw'}}>
            <MUIDataTable
                title={""}
                data={props.cities}
                columns={columns as MUIDataTableColumnDef[]}
                options={options}
            />
        </div>
      </div>
    );
}

export default YearInstanceTable;