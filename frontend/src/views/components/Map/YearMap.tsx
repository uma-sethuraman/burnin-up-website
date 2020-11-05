import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';
import { CityTemperature } from "../Year/YearInstance";

/* from https://levelup.gitconnected.com/"
+"reactjs-google-maps-with-custom-marker-ece0c7d184c4 */

/* displays world map with markers at all cities passed in */
const YearMap = (cities: CityTemperature[]) => {

    /* allows marker to be clicked and to redirect to city page */
    function markerClick(key:any, childProps:any){
      window.location.assign("/cities/id="+childProps.id)
    }

    /* display each location from the cities array as a marker */
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          defaultCenter={{lat: 0, lng: 0 }}
          defaultZoom={1}
          onChildClick = {markerClick}
        >
        {cities.map(city => (
            <Marker
              lat={city.latitude}
              lng={city.longitude}
              name={city.city}
              id={city.city_id}
              key={city.city_id}
              color="blue"/>
        ))}
        </GoogleMapReact>
        </div>
      );
}

export default YearMap;

