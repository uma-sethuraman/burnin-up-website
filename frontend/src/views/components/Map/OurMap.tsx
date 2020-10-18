//copied from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;

const OurMap = (latitude: number, longitude: number, locationName: string) => {
    const [center, setCenter] = useState({lat: latitude, lng: longitude });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          /* how to change center?? */
          defaultCenter={center}
          defaultZoom={zoom}
        >
        <Marker
        lat={latitude}
        lng={longitude}
        name={locationName}
        color="blue"/>

          
        </GoogleMapReact>
      </div>
    );
}

export default OurMap;