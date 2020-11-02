import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from "react-bootstrap/Image";
import useAxios from 'axios-hooks';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const LocationPhoto= (cityName:string) => {
    console.log("in location photo");
    // console.log("CityName" + cityName);
    const [photoRef, setPhotoRef] = useState("");
    
    const findPhotoRef = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"+
    "input="+cityName + "&inputtype=textquery&fields=photos&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"

    // const [{ data, loading, error }, refetch] = useAxios(findPhotoRef);

    // useEffect(() => {
    //     const ret:LocationPhotoData = data as LocationPhotoData;
    //     console.log("data" + data)
    //     setPhotoRef(ret.candidates[0].photos[0].photo_reference);
    // }, [data]);

    const getPhotoReference = () => {
        axios.get(findPhotoRef)
        .then((response)=>{
            const ret:LocationPhotoData = JSON.parse(JSON.stringify(response)).data as LocationPhotoData;
            setPhotoRef(ret.candidates[0].photos[0].photo_reference);
          })
        .catch((error) => {
            console.log(error);
        })
    };

    getPhotoReference();

    const actualPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&"+
    "photoreference="+photoRef+ "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"
    
    return actualPhoto;
}

export default LocationPhoto;

export interface LocationPhotoData {
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

// export default LocationPhoto;