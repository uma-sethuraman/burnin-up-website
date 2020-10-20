import { Link } from "react-router-dom";
import React from 'react';
import Table from "react-bootstrap/Table";
import { Country } from "./Country/CountryInstance";
import { useState, useEffect } from 'react';
import axios from "axios";
import {CapitalData} from "./Country/CountryInstance";

// credit: https://www.youtube.com/watch?v=IYCa1F-OWmk
const Posts = (posts: Country[]) => {

  return (
    <Table striped bordered hover size="sm" variant="dark">
         <thead>
            <tr>
              <th>Country</th>
              <th>Income Level</th>
              <th>Region</th>
              <th>Capital City</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Most Recent CO2 Emissions (ppm)</th>
            </tr>
          </thead>
          <tbody>
          {posts.map(post => (
            <tr key={post.country_id}>
                <td>
                    <Link to={"/countries/id="+post.country_id}>
                        {post.country_name}
                    </Link>
                </td>
                <td>{post.country_income}</td>
                <td>{post.country_region}</td>
                <td>{post.country_capital_city}</td>
                <td>{post.country_lat}</td>
                <td>{post.country_long}</td>
                <td>{post.recent_emissions}</td>
            </tr>
          ))}
          </tbody>
    </Table>
  );
};

export default Posts;