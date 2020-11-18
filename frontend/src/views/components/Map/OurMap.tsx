import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';

/* from https://levelup.gitconnected.com/"
+"reactjs-google-maps-with-custom-marker-ece0c7d184c4 */

/* displays world map with a marker at the location passed in */
/*style={{ height: '100vh', width: '100%' }*/
const OurMap = (latitude: number, longitude: number, locationName: string, map_style?: any ) => {
    return (
        <div style={map_style ? map_style: { height: '75vh', width: '90vh', margin:'10vh' }}> 
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          defaultCenter={{lat:latitude, lng:longitude}}
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