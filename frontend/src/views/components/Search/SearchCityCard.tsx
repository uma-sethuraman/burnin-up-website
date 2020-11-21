import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchCityCard(props:any) {

    const city_attributes = [
        {
            name: "Name:",
            attribute: "city_name"
        },
        {
            name: "Country:",
            attribute: "country_name"
        },
        {
            name: "Population:",
            attribute: "population"
        },
        {
            name: "PM10:",
            attribute: "pm10"
        },
        {
            name: "O3:",
            attribute: "o3"
        },
        {
            name: "PM2.5:",
            attribute: "pm25"
        },
        {
            name: "Highest Annual Temperature:",
            attribute: "highest_temp"
        },
        {
            name: "Year of Highest Annual Temperature:",
            attribute: "year_highest"
        },
        {
            name: "Latitude:",
            attribute: "latitude"
        },
        {
            name: "Longitude:",
            attribute: "longitude"
        }
    ]

    const displayCardText = () => {
        return (
            city_attributes.map((city) => (
                <Card.Text className="card-text-style">
                    <b>{city.name} {" "}</b>
                    <Highlight attribute={city.attribute} tagName="mark" hit={props.hit} />
                </Card.Text>
            ))
        );
    }

    return(
        <Card>
            <Card.Body>
                <a href={"/cities/id=" + props.hit.city_id}>
                    <u>
                        <Card.Title className="card-title-style">
                            {props.hit.city_name}
                        </Card.Title>
                    </u>
                </a>
                {displayCardText()}
            </Card.Body>
        </Card> 
    );
}
export default SearchCityCard;
