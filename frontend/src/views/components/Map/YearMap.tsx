//copied from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';
import { CityTemperaturesYear } from "../Year/YearInstance";


const AnyReactComponent = ({ text }: any) => <div>{text}</div>;



const YearMap = (cities: CityTemperaturesYear[]) => {

    const [cityLocations, setCityLocations] = React.useState<CityTemperaturesYear[]>([]);
    const [center, setCenter] = useState({lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(1);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        {cities.map(city => (
            <Marker
              lat={city.lat}
              lng={city.long}
              name={city.city}
              color="blue"/>
        ))}
        </GoogleMapReact>
        </div>
      );
    

  }
    


  

export default YearMap;

