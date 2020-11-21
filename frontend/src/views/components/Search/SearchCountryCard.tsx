import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchCountryCard(props:any) {

    const country_attributes = [
        {
            name: "Name:",
            attribute: "country_name",
            attribute_id: 0
        },
        {
            name: "Capital City:",
            attribute: "country_capital_city",
            attribute_id: 1
        },
        {
            name: "ISO2 Code:",
            attribute: "country_iso2code",
            attribute_id: 2
        },
        {
            name: "ISO3 Code:",
            attribute: "country_iso3code",
            attribute_id: 3
        },
        {
            name: "Region:",
            attribute: "country_region",
            attribute_id: 4
        },
        {
            name: "Population:",
            attribute: "country_population",
            attribute_id: 5
        },
        {
            name: "Highest Annual CO2 Emission Level:",
            attribute: "highest_emission",
            attribute_id: 6
        },
        {
            name: "Year of Highest Annual CO2 Emission Level:",
            attribute: "high_year",
            attribute_id: 7
        },
        {
            name: "Income Level:",
            attribute: "income_level",
            attribute_id: 8
        },
        {
            name: "Latitude:",
            attribute: "lat",
            attribute_id: 9
        },
        {
            name: "Longitude:",
            attribute: "long",
            attribute_id: 10
        },
        {
            name: "Recent CO2 Emissions:",
            attribute: "recent_emissions",
            attribute_id: 11
        }
    ]

    const displayCountryText = () => {
        return (
            country_attributes.map((country) => (
                <Card.Text className="card-text-style" key={country.attribute_id}>
                    <b>{country.name} {" "}</b>
                    <Highlight attribute={country.attribute} tagName="mark" hit={props.hit} />
                </Card.Text>
            ))
        );
    }

    return(
        <Card>
            <Card.Body>
                <a href={"/countries/id=" + props.hit.country_id}>
                    <u>
                        <Card.Title className="card-title-style">
                            {props.hit.country_name}
                        </Card.Title>
                    </u>
                </a>
                {displayCountryText()}
            </Card.Body>
        </Card> 
    );
}
export default SearchCountryCard;
