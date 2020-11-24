import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Image from "react-bootstrap/Image";

/* returns an image of the given city or country,
used by city and country instance pages */
const LocationPhoto = (name: any) => {

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
    /* saves link to photo from google maps API */
    const [actualPhoto, setActualPhoto] = useState<string>("");

    /* request link for google maps API */
    const findPhotoRef = 
    "https://cors-anywhere.herokuapp.com/"+
    "https://maps.googleapis.com/maps/"
    +"api/place/findplacefromtext/json?input=" + name.name + 
    "&inputtype=textquery&fields=photos&key"+
    "=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc";

    /* makes request to Google Maps API to get the link of the actual photo */
    useEffect(() => {
        axios.get(findPhotoRef)
            .then((response) => {
                const ret: LocationPhotoData = JSON.parse(
                JSON.stringify(response)).data as LocationPhotoData;
                
                setActualPhoto("https://maps.googleapis.com/maps/api/place"
                + "/photo?maxwidth=400&photoreference=" + 
                ret.candidates[0].photos[0].photo_reference + 
                "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc");
            })
            .catch((error) => {
                /* development: console.log('error')*/
            })
    }, [findPhotoRef]);

    /* return an image of the provided location */
    return(
        <div>
            {actualPhoto === "" ? 
            (<Spinner animation="border" />):
            (<Image src={actualPhoto}/>)}
        </div>
    );
}

export default LocationPhoto;

/* interfaces related to Google Maps API request */

export interface LocationPhotoData {
    candidates: Candidate[];
    status: string;
}

export interface Candidate {
    photos: Photo[];
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}