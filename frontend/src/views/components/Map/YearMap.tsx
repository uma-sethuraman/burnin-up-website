//copied from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';
import { CityTemperature } from "../Year/YearInstance";

const YearMap = (cities: CityTemperature[]) => {

  function markerClick(key:any, childProps:any){
    window.location.assign("/cities/id="+childProps.id)
  }

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
              color="blue"/>
        ))}
        </GoogleMapReact>
        </div>
      );
  }
    


  

export default YearMap;

