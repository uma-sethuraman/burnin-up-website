import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchYearCard(props:any) {

    const year_attributes = [
        {
            name: "Year:",
            attribute: "year_id"
        },
        {
            name: "CO2:",
            attribute: "co2"
        },
        {
            name: "Methane:",
            attribute: "methane"
        },
        {
            name: "Nitrous Oxide:",
            attribute: "nitrous_oxide"
        },
        {
            name: "Polar Ice Extent:",
            attribute: "polar_ice"
        },
        {
            name: "Absolute Sea Level Change Since 1880:",
            attribute: "sea_level"
        },
        {
            name: "Temperature Anomaly:",
            attribute: "temp_anomaly"
        },
        {
            name: "World Population:",
            attribute: "world_population"
        }
    ]

    const displayYearText = () => {
        return (
            year_attributes.map((year) => (
                <Card.Text className="card-text-style">
                    <b>{year.name} {" "}</b>
                    <Highlight attribute={year.attribute} tagName="mark" hit={props.hit} />
                </Card.Text>
            ))
        );
    }

    const countryEmissionsList = () => {
        return (
            <Card.Text className="card-text-style">
                <b>Top 10 Countries:</b>
                <div className="list-item">
                    <ul>
                        {props.hit.countries_emissions.map((country_elem: any, index: any) => (
                            <li key={country_elem?.country_id}>
                                <Highlight
                                attribute={`countries_emissions[${index}].country`}
                                hit={props.hit}
                                tagName="mark"
                                />
                            </li>))}
                    </ul>
                </div>
            </Card.Text>
        );
    }

    const cityTempsList = () => {
        return (
            <Card.Text className="card-text-style">
                <b>Top 10 Cities:</b>
                <div className="list-item">
                    <ul>
                        {props.hit.city_temperatures.map((city_elem: any, index: any) => (
                            <li key={city_elem?.city_id}>
                                <Highlight
                                attribute={`city_temperatures[${index}].city`}
                                hit={props.hit}
                                tagName="mark"
                                />
                            </li>))}
                    </ul>
                </div>
            </Card.Text>
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