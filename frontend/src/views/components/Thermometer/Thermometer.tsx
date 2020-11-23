import { Link } from "react-router-dom";
import React from "react";
import "./Thermometer.css";
import Thermometer from 'react-thermometer-component'

function CityThermometer(props: any) {
    let link: string = "";
    let temp: number = 0;
    let degreeType: string = "°C";
    if (props.year === -1 || props.year === undefined) {
        link = "/years/id=2018"
    }
    else {
        link = "/years/id=" + props.year;
    }

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