import React from "react";
import MUIDataTable from "mui-datatables";
import { MUIDataTableColumnDef } from "mui-datatables";
import "./YearInstanceTable.css";

function YearInstanceTable(props: any) {
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
          label: "Highest Temperature",
          options: {
            filter: false,
            sort: true,
          },
        }];

        const options = {
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
                {/* displaying the table of all years, 
                with searching and pagination */}
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