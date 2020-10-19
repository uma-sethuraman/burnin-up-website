import axios from 'axios';
import React, { useState } from 'react';
import Image from "react-bootstrap/Image";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const LocationPhoto = (cityName:string) => {
    const [photoRef, setPhotoRef] = useState("");
    
    const findPhotoRef = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"+
    "input="+cityName + "&inputtype=textquery&fields=photos&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"

    const getPhotoReference = () => {
        axios.get(findPhotoRef)
        .then((response)=>{
            const ret:LocationPhoto = JSON.parse(JSON.stringify(response)).data as LocationPhoto;
            setPhotoRef(ret.candidates[0].photos[0].photo_reference);
          })
        .catch((error) => {
            console.log(error);
        })
    };

    getPhotoReference();

    const actualPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&"+
    "photoreference="+photoRef+ "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"
    
    return (
        <Image src={actualPhoto} fluid/>
    );
}

export interface LocationPhoto {
    candidates: Candidate[];
    status:     string;
}

export interface Candidate {
    photos: Photo[];
}

export interface Photo {
    height:            number;
    html_attributions: string[];
    photo_reference:   string;
    width:             number;
}

export default LocationPhoto;