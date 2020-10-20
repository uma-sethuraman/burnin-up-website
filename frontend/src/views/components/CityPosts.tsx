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
              <th>Country iso2 Code</th>
              <th>Elevation (ft)</th>
              <th>O3 (Dobson Units)</th>
              <th>PM10 (ug/m3)</th>
              <th>PM2.5 (ug/m3)</th>
              <th>Population</th>
              <th>Time Zone</th>
            </tr>
          </thead>
          <tbody>
          {posts.map(post => (
            <tr key={post.city_id}>
                <td>
                    <Link to={"/cities/id="+post.city_id}>
                        {post.city_name}
                    </Link>
                </td>
                <td>{post.country_iso2code}</td>
                <td>{post.elevation}</td>
              <td>{post.o3}</td>
              <td>{post.pm10}</td>
              <td>{post.pm25}</td>
              <td>{post.population}</td>
              <td>{post.time_zone}</td>
            </tr>
          ))}
          </tbody>
    </Table>
  );
};

export default CityPosts;