import axios from 'axios';
import React, { useState } from 'react';
import Image from "react-bootstrap/Image";

const LocationPhoto = (cityName:string) => {
    // const [photoRef, setPhotoRef] = useState(null);
    const [photoRef, setPhotoRef] = useState("");
    // let photoRef:string = ""
    
    const findPhotoRef = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"+
    "input="+cityName + "&inputtype=textquery&fields=photos&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"
    console.log("PHOTOREF:");
    console.log(findPhotoRef);

    const getPhotoReference = () => {
        // let photoReference:string = "";
        axios.get(findPhotoRef)
        .then((response)=>{
            console.log("WHATTHEFUACCC");
            console.log(JSON.parse(JSON.stringify(response)));
            const ret:LocationPhoto = JSON.parse(JSON.stringify(response)).data as LocationPhoto;
            console.log("hello");
            console.log(ret);
            setPhotoRef(ret.candidates[0].photos[0].photo_reference);
            console.log("PhotoRef");
            console.log(photoRef)
          })
        .catch((error) => {
            console.log("HELLLLLLLLPPPPPPPPPPPPP");
            console.log(error);
        })
        // return photoReference;
    };

    //HOW DO I SET PHOTOREF?! Request is good, it just doesn't update the string 
    getPhotoReference();
    console.log("UPDATED OUTSIDE??");
    console.log(photoRef);

    const actualPhoto = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&"+
    "photoreference"+photoRef+ "&key=AIzaSyCzdtsBKJELtLdSZD7NJAsiTKcULgSZGlc"
    
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