import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from "react-bootstrap/Image";
import useAxios from 'axios-hooks';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* Returns link for a photo of the given city or country,
used by city and country instance pages */
const LocationPhoto = (name: string) => {

    /* Saves photo reference */
    const [photoRef, setPhotoRef] = useState("");

    const findPhotoRef = 
    "https://cors-anywhere.herokuapp.com/"+
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" +
    "input=" + name + "&inputtype=textquery&fields=photos&" +"key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"

    /* Makes request to Google Maps API to get the link of the actual photo */
    const getPhotoReference = () => {
        axios.get(findPhotoRef)
            .then((response) => {
                const ret: LocationPhotoData = JSON.parse(JSON.stringify(response)).data as LocationPhotoData;
                setPhotoRef(ret.candidates[0].photos[0].photo_reference);
            })
            .catch((error) => {
                /*Development: console.log('error')*/
            })
    };

    useEffect(() => {
        getPhotoReference();
    }, [getPhotoReference]);

    /* Link to actual photo, returned by this function*/
    const actualPhoto = 
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&" + "photoreference=" + photoRef + 
    "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"

    return actualPhoto;
}

export default LocationPhoto;

/* Interfaces related to Google Maps API request */

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