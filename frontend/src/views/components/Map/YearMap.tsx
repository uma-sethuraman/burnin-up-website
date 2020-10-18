//copied from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';
import { CountryEmissionsYear } from '../Year/YearInstance';
import { Country, CountryIncome, CountryRegion } from '../Country/CountryInstance';
import axios from "axios";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;



const YearMap = (countries: CountryEmissionsYear[]) => {

  const [countryLocations, setCountryLocations] = React.useState<Country[]>([]);
  const [latAvg, setLatAvg] = React.useState(0);
  const [longAvg, setLongAvg] = React.useState(0);
  const getData = () => {
    let localLatSum = 0;
    let localLongSum = 0;
    let copyArray: Country[] = [];
    console.log("COUNTRIES ARRAY" + JSON.stringify(countries));
    for (let country of countries) {
      axios.get("/api/countries/name=" + country.country)
        .then((response) => {
          let localCountry: Country = JSON.parse(JSON.stringify(response.data)) as Country;
          copyArray.push(localCountry);
          localLatSum += localCountry.country_lat;
          localLongSum += localCountry.country_long;
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setCountryLocations(old => {
      return [...copyArray]
    });
    
    setLatAvg(localLatSum / countries.length);
    setLongAvg(localLongSum / countries.length);

  }
    


  const [center, setCenter] = useState({lat: latAvg, lng: longAvg});
  const [zoom, setZoom] = useState(11);
  getData();
  // console.log(JSON.stringify(countryLocations));
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          /* how to change center?? */
          defaultCenter={center}
          defaultZoom={zoom}
        >
        <Marker
        lat={countryLocations[0].country_lat}
        lng={countryLocations[0].country_long}
        name={countryLocations[0].country_name}
        color="blue"/>

          
        </GoogleMapReact>
      </div>
    );
}

export default YearMap;

