import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchCityCard(props:any) {
    return(
        // <div className="col-sm d-flex">
        <Card>
        {/* <Card.Img variant="top" src={props.member.image} /> */}
        <div style={{color: "black"}}>
        <Card.Body>
            <a href={"/cities/id=" + props.hit.city_id}>
                <Card.Title>{props.hit.city_name}</Card.Title>
            </a>
            <Card.Text>
                Name: {" "}
                <Highlight attribute="city_name" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Country: {" "}
                <Highlight attribute="country_name" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Population: {" "}
                <Highlight attribute="population" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                PM10: {" "}
                <Highlight attribute="pm10" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                O3: {" "}
                <Highlight attribute="o3" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                PM2.5: {" "}
                <Highlight attribute="pm25" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Highest Annual Temperature: {" "}
                <Highlight attribute="highest_temp" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Highest Annual Temperature: {" "}
                <Highlight attribute="highest_temp" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Year of Highest Annual Temperature: {" "}
                <Highlight attribute="year_highest" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Latitude: {" "}
                <Highlight attribute="latitude" tagName="mark" hit={props.hit} />
            </Card.Text>
            <Card.Text>
                Longitude: {" "}
                <Highlight attribute="longitude" tagName="mark" hit={props.hit} />
            </Card.Text>
            
        </Card.Body>
        </div>
        </Card>
        // </div>
       
    );
}
export default SearchCityCard;
