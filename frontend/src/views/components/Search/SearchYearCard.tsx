import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchYearCard(props:any) {

    const year_attributes = [
        {
            name: "Year:",
            attribute: "year_id",
            attribute_id: 0
        },
        {
            name: "CO2:",
            attribute: "co2",
            attribute_id: 1
        },
        {
            name: "Methane:",
            attribute: "methane",
            attribute_id: 2
        },
        {
            name: "Nitrous Oxide:",
            attribute: "nitrous_oxide",
            attribute_id: 3
        },
        {
            name: "Polar Ice Extent:",
            attribute: "polar_ice",
            attribute_id: 4
        },
        {
            name: "Absolute Sea Level Change Since 1880:",
            attribute: "sea_level",
            attribute_id: 5
        },
        {
            name: "Temperature Anomaly:",
            attribute: "temp_anomaly",
            attribute_id: 6
        },
        {
            name: "World Population:",
            attribute: "world_population",
            attribute_id: 7
        }
    ]

    const displayYearText = () => {
        return (
            year_attributes.map((year) => (
                <Card.Text className="card-text-style" key={year.attribute_id}>
                    <b>{year.name} {" "}</b>
                    <Highlight attribute={year.attribute} tagName="mark" hit={props.hit} />
                </Card.Text>
            ))
        );
    }

    const countryEmissionsList = () => {
        return (
            <div>
                <Card.Text className="card-text-style">
                    <b>Top 10 Countries:</b>
                </Card.Text>
                <div className="list-item">
                    <ul>
                        <Card.Text className="card-text-style">
                            {props.hit.countries_emissions.map((country_elem: any, index: any) => (
                                <li key={country_elem?.country_id}>
                                    <Highlight
                                    attribute={`countries_emissions[${index}].country`}
                                    hit={props.hit}
                                    tagName="mark"
                                    />
                                </li>))}
                        </Card.Text>
                    </ul>
                </div>
            </div>
        );
    }

    const cityTempsList = () => {
        return (
            <div>
                <Card.Text className="card-text-style">
                    <b>Top 10 Cities:</b>
                </Card.Text>
                <div className="list-item">
                    <ul>
                        <Card.Text className="card-text-style">
                            {props.hit.city_temperatures.map((city_elem: any, index: any) => (
                                <li key={city_elem?.city_id}>
                                    <Highlight
                                    attribute={`city_temperatures[${index}].city`}
                                    hit={props.hit}
                                    tagName="mark"
                                    />
                                </li>))}
                        </Card.Text>
                    </ul>
                </div>
            </div>
        );
    }

    return(
        <Card>
            <Card.Body>
                <a href={"/years/id=" + props.hit.year_id}>
                    <u>
                        <Card.Title className="card-title-style">
                            {props.hit.year_id}
                        </Card.Title>
                    </u>
                </a>
                {displayYearText()}
                {countryEmissionsList()}
                <br />
                {cityTempsList()}
            </Card.Body>
        </Card> 
    );
}
export default SearchYearCard;