import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';

/* from https://levelup.gitconnected.com/"
+"reactjs-google-maps-with-custom-marker-ece0c7d184c4 */

/* displays world map with a marker at the location passed in */

/* props = {latitude: number, longitude: number, 
locationName: string, map_style?: any} */
const OurMap = (props: any) => {

  /* allows marker to be clicked and to redirect */
  function markerClick(key:any, childProps:any){
    if (props.map_type === "country")
      window.location.assign("/cities/id="+childProps.id);
    else if (props.map_type === "city")
      window.location.assign("/countries/id="+childProps.id);
  }

    return (
        <div style={props.map_style !== undefined ? props.map_style: { height: '75vh', width: '90vh', margin:'10vh' }}> 
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhcWoY9R1YI__bc0fC8vHRN8eEMVYoLKM' }}
          center={{lat:props.latitude, lng:props.longitude}}
          defaultZoom={1}
          onChildClick = {markerClick}
        >
          <Marker
          lat={props.latitude}
          lng={props.longitude}
          name={props.locationName}
          id={props.id}
          key={props.id}
          color="blue"/>
        </GoogleMapReact>
      </div>
    );
}

export default OurMap;