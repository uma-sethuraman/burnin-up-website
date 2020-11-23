import { Link } from "react-router-dom";
import React from "react";
import "./CityThermometer.css";
import Thermometer from 'react-thermometer-component'

/* displays a clickable thermometer of 
the highest annual temperature of 
passed in city */
function CityThermometer(props: any) {
    let link: string = ""; /* link to year of highest temperature */
    let temp: number = 0; /* highest annual temperature */
    let degreeType: string = "°C"; /* temperature format */

    /* set the link to corresponding year or default */
    if (props.year === -1 || props.year === undefined) {
        link = "/years/id=2018"
    }
    else {
        link = "/years/id=" + props.year;
    }

    /* set the temp to corresponding temperature
    or default and set the temperature format */
    if (props.temp === -1 || props.temp === undefined) {
        temp = 10;
    }
    else {
        if (props.temp > 40) {
            degreeType = "°F";
            temp = props.temp;
        }
        else
            temp = props.temp;
    }

    return (
        <div className = "temp-side-by-side">
            <div className="thermometer-style">
                {/* thermometer links to year of highest temperature */}
                <Link to ={link} >
                  <Thermometer
                    theme="dark"
                    value={temp}
                    max="150"
                    steps="3"
                    format={degreeType}
                    size="large"
                    height="300"
                  />
                </Link>
              </div>
              <div className="thermometer-caption">
                Click the thermometer to view the year!
            </div>
        </div>
    );
}

export default CityThermometer;