import { Link } from "react-router-dom";
import React from 'react';
import Table from "react-bootstrap/Table";
import { Country } from "./Country/CountryInstance";

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
            </tr>
          </thead>
          <tbody>
          {posts.filter(post => post.country_income.toString() !== "Aggregates").map(filteredPost => (
            <tr key={filteredPost.country_id}>
                <td>
                    <Link to={"/countries/id="+filteredPost.country_id}>
                        {filteredPost.country_name}
                    </Link>
                </td>
                <td>{filteredPost.country_income}</td>
                <td>{filteredPost.country_region}</td>
                <td>{filteredPost.country_capital_city}</td>
            </tr>
          ))}
          </tbody>
    </Table>
  );
};

export default Posts;