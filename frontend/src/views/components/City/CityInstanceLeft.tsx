import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import "./CityInstance.css";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import CityThermometer from '../Thermometer/CityThermometer';

/* displays left column of the city instance page */
const CityInstanceLeft = (props: any) => {
  return (
    <header className="City-header">
      <div>
        {/* city image */}
        <LocationPhoto name={encodeURI(props.city?.city_name!)} />
        <br />

        {/* city population */}
        <div className="info-style">
          {props.city?.population !== -1 ? props.city?.population : "-"}
        </div>
        <div className="info-title-style">Population</div>
        <br />

        {/* year of highest annual temperature */}
        <div className="info-style">
          {(props.city?.year_highest !== -1) || 
          (props.city?.year_highest === undefined) ? (
            <div>
              <Link to={"/years/id=" + props.city?.year_highest}>
                <u>{props.city?.year_highest}</u>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/years/id=2018"}>
                <u>2018</u>
              </Link>
            </div>
          )}
        </div>
        <div className="info-title-style">
          Year of Highest Annual Temperature
        </div>
        <br />
        
        {/* thermometer with highest temperature */}
        <CityThermometer year = {props.city?.year_highest} 
          temp={props.city?.highest_temp.toFixed(2)}/>
        <br />

        {/* highest annual temperature */}
        <div className="info-style">
          {((props.city?.highest_temp !== undefined) ||
           (props.city?.highest_temp !== -1))?
              props.city?.highest_temp.toFixed(2) +
              (props.city?.highest_temp! > 40 ? " °F" : " °C"): "-"}
        </div>
        <div className="info-title-style">
          Highest Annual Temperature
        </div>
        <br />
      </div>
    </header>
  );
};

export default CityInstanceLeft;
