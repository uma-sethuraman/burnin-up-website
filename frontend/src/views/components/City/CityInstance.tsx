import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Navbar from "../OurNavbar";
import "./CityInstance.css";
import useAxios from "axios-hooks";
import LocationPhoto from "../LocationPhoto/LocationPhoto";
import OurMap from "../Map/OurMap";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Image from "react-bootstrap/Image";
import Loading from "../Loading";
import YearsTimeline from "../YearsTimeline/YearsTimeline";

/* city instance page, takes in city id,
route = "/cities/id=" */
const CityInstance = (id: any) => {
  const [city, setCity] = React.useState<City>();

  /* fetch city data */
  const [{ data, loading, error }] = useAxios(
    "/api/cities/id=" + id.id
  );

  /* if id is undefined show our 404 page */
  if (error || id.id === undefined) {
    window.location.assign("/404");
  }

  /* set city data */
  useEffect(() => {
    const cityObj: City = data as City;
    if (cityObj) {
      setCity(cityObj);
    }
  }, [data]);

  WebFont.load({
    google: {
      families: [
        "serif",
        "Staatliches",
        "sans-serif",
        "Raleway",
      ],
    },
  });

  return (
    <div className="CityInstance">
      <Navbar singleColor = {true} />

      {/* show spinner if content is loading */}
      { loading ? (<Loading/>) : (
        
        <div className="row">
        <div className="column1">
          <header className="City-header">
            
            <div>
              <LocationPhoto name={(encodeURI(city?.city_name!))} />
              <br/>
          
              <div className="info-style">
                {(city?.highest_temp !== (undefined || -1)) ? 
                (city?.highest_temp.toFixed(2) + 
                  (city?.highest_temp! > 40 ? " °F" : " °C")) : "-"
                }
              </div>
              <div className="info-title-style">
                Highest Annual Temperature
              </div>
            
              <br/>
              <div className="info-style">
                {(city?.year_highest !== -1 
                || city?.year_highest === undefined)? (
                  <div>
                  <YearsTimeline year={city?.year_highest}/>
                  <Link to={"/years/id=" + city?.year_highest}>
                    <u>{city?.year_highest}</u></Link></div>) : (
                      <div>
                      <YearsTimeline year={2018}/>
                      <Link to={"/years/id=2018"}><u>2018</u></Link>
                      </div>)}
                </div>
              <div className="info-title-style">
                Year of Highest Annual Temperature
              </div>
              
              <br/>

              <div className="info-style">
                  {city?.population !== -1 ? 
                  (city?.population) : ("-")}
              </div>
              <div className="info-title-style">
                Population
              </div>
              <br />
  
            </div>
          </header> 
        </div>  
        
        <div className="line">
          <Image src={require("../../../assets/line-shadow.png")} height="100%"></Image>
        </div>
                
        <div className="column2">
          <header className="City-header">
             <div className="title">
              <h3> {city?.city_name} </h3>
              <h3> <Link to={"/countries/id=" + city?.country_id}>
                      <u>{city?.country_name}</u>
                    </Link> </h3>
            </div>
            {/* <AiOutlineLine size="500px"/> */}
            <div className="row-style"> 
              <div className="row">
                <div className="subcolumn">
                  <div className="info-style">{city?.pm25 + " "}</div>
                  <div className="info-title-style">PM2.5</div>
                  <div className="info-unit-style">ug/m3</div>
                </div> 
                    
                <div className="subcolumn">
                  <div className="info-style">{city?.pm10 + " "}</div>
                  <div className="info-title-style">PM10 </div>
                  <div className="info-unit-style">ug/m3</div>
                </div>

                <div className="subcolumn">
                  <div className="info-style">{city?.o3 + " "}</div>
                  <div className="info-title-style">O3</div>
                  <div className="info-unit-style">Dobson Units</div>
                </div>
  
              </div>
            </div>
            <br /> <br /> <br />
            <div className="info-title-style">
                Click on map marker to view {" "}
                {city?.country_name}!
              </div> 
                <OurMap
                  latitude = {Number(city?.latitude! === undefined ? 0 : Number(city?.latitude!))}
                  longitude = {Number(city?.longitude! === undefined ? 0 : Number(city?.longitude!))}
                  locationName = {city?.city_name!}
                  map_style = {{height: '75vh', width: '90vh', marginLeft:'10vh', marginRight:'10vh', marginBottom: '10vh'}}
                  id = {city?.country_id}
                  map_type="city"
                />      
          </header>
        </div>
          
        </div>
        )} 
    </div>
  );
};

/* relevant interfaces for city and country data */

export interface CityObject {
  cities: City[];
}

export interface City {
  city_id: number;
  city_name: string;
  country_id: number;
  country_name: string;
  highest_temp: number;
  latitude: number;
  longitude: number;
  o3: number;
  pm10: number;
  pm25: number;
  population: number;
  year_highest: number;
}

export interface CountryIdentification {
  country_code: CountryCode;
}

export interface CountryCode {
  id: number;
  name: string;
}

export default CityInstance;
