import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useCallback } from 'react'
import Image from "react-bootstrap/Image";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* Returns link for a photo of the given city or country,
used by city and country instance pages */
const LocationPhoto = (name: string) => {

    /* Saves photo reference */
    const [actualPhoto, setActualPhoto] = useState<string>("");

    const findPhotoRef = 
    "https://cors-anywhere.herokuapp.com/"+
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + name + 
    "&inputtype=textquery&fields=photos&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc";

    /* Makes request to Google Maps API to get the link of the actual photo */
    // const getPhotoReference = useCallback(() => {
        
    // },[findPhotoRef]);

    useEffect(() => {
        axios.get(findPhotoRef)
            .then((response) => {
                const ret: LocationPhotoData = JSON.parse(JSON.stringify(response)).data as LocationPhotoData;
                setActualPhoto("https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=" + ret.candidates[0].photos[0].photo_reference + 
                "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc");
            })
            .catch((error) => {
                /*Development: console.log('error')*/
            })
    }, [findPhotoRef]);

    /* Link to actual photo, returned by this function*/
    // const actualPhoto = 


    // return actualPhoto;
    return(
    <div>
        <Image src={actualPhoto}/>
    </div>);
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