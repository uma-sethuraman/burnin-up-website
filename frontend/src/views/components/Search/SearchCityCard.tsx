import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

/* displays card for a city result
in the search page */
function SearchCityCard(props:any) {

    /* attributes of a city */
    const city_attributes = [
        {
            name: "Name:",
            attribute: "city_name",
            attribute_id: 0
        },
        {
            name: "Country:",
            attribute: "country_name",
            attribute_id: 1
        },
        {
            name: "Population:",
            attribute: "population",
            attribute_id: 2
        },
        {
            name: "PM10:",
            attribute: "pm10",
            attribute_id: 3
        },
        {
            name: "O3:",
            attribute: "o3",
            attribute_id: 4
        },
        {
            name: "PM2.5:",
            attribute: "pm25",
            attribute_id: 5
        },
        {
            name: "Highest Annual Temperature:",
            attribute: "highest_temp",
            attribute_id: 6
        },
        {
            name: "Year of Highest Annual Temperature:",
            attribute: "year_highest",
            attribute_id: 7
        },
        {
            name: "Latitude:",
            attribute: "latitude",
            attribute_id: 8
        },
        {
            name: "Longitude:",
            attribute: "longitude",
            attribute_id: 9
        }
    ]

    /* map the attribute data to text in the card */
    const displayCardText = () => {
        return (
        city_attributes.map((city) => (
            <Card.Text className="card-text-style" 
                        key={city.attribute_id}>
                <b>{city.name} {" "}</b>
                <Highlight attribute={city.attribute} 
                            tagName="mark" 
                            hit={props.hit} />
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
