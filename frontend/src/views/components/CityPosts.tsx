import { Link } from "react-router-dom";
import React from 'react';
import Table from "react-bootstrap/Table";
import { City } from "./City/CityInstance";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const CityPosts = (posts: City[]) => {

  return (
    <Table striped bordered hover size="sm" variant="dark">
         <thead>
            <tr>
              <th>City</th>
              <th>Country ISO2 Code</th>
              <th>O3 (Dobson Units)</th>
              <th>PM10 (ug/m3)</th>
              <th>PM2.5 (ug/m3)</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
          {posts.filter(post => post.o3 !== -1).map(filteredPost => (
            <tr key={filteredPost.city_id}>
              <td>
                    <Link to={"/cities/id="+filteredPost.city_id}>
                        {filteredPost.city_name}
                    </Link>
              </td>
              <td>{filteredPost.country_iso2code}</td>
              <td>{filteredPost.o3}</td>
              <td>{filteredPost.pm10}</td>
              <td>{filteredPost.pm25}</td>
              {filteredPost.population !== 0? 
              <td>{filteredPost.population}</td> : <td>-</td>}
            </tr>
          ))}
          </tbody>
    </Table>
  );
};

export default CityPosts;