//copied from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;

const OurMap = (props: any) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        <Marker
        lat={11.0168}
        lng={76.9558}
        name="My Marker"
        color="blue"
          />
          <Marker
        lat={50}
        lng={4}
        name="My Marker"
        color="blue"
          />
          <Marker
        lat={25}
        lng={25}
        name="My Marker"
        color="blue"
          />
          
        </GoogleMapReact>
      </div>
    );
}

export default OurMap;