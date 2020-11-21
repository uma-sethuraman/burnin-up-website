import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight } from "react-instantsearch-dom";

function SearchCountryCard(props:any) {

    const country_attributes = [
        {
            name: "Name:",
            attribute: "country_name"
        },
        {
            name: "Capital City:",
            attribute: "country_capital_city"
        },
        {
            name: "ISO2 Code:",
            attribute: "country_iso2code"
        },
        {
            name: "ISO3 Code:",
            attribute: "country_iso3code"
        },
        {
            name: "Region:",
            attribute: "country_region"
        },
        {
            name: "Population:",
            attribute: "country_population"
        },
        {
            name: "Highest Annual CO2 Emission Level:",
            attribute: "highest_emission"
        },
        {
            name: "Year of Highest Annual CO2 Emission Level:",
            attribute: "high_year"
        },
        {
            name: "Income Level:",
            attribute: "income_level"
        },
        {
            name: "Latitude:",
            attribute: "lat"
        },
        {
            name: "Longitude:",
            attribute: "long"
        },
        {
            name: "Recent CO2 Emissions:",
            attribute: "recent_emissions"
        }
    ]

    const displayCountryText = () => {
        return (
            country_attributes.map((country) => (
                <Card.Text className="card-text-style">
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
