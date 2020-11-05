import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';

/* from https://levelup.gitconnected.com/"
+"reactjs-google-maps-with-custom-marker-ece0c7d184c4 */

/* displays world map with a marker at the location passed in */
const OurMap = (latitude: number, longitude: number, locationName: string) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          defaultCenter={{lat:0, lng:0}}
          defaultZoom={1}
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