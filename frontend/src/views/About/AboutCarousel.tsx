import React from "react";
import { GroupMember} from "./AboutInterfaces";
import AboutCard from "./AboutCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

//https://www.newline.co/@dmitryrogozhny/
//how-to-show-carousel-in-react-applications-with-react-slick--07445c23
export default function AboutCarousel(props:any) {
  const renderSlides = () =>
  props.members.map((member:GroupMember) => (
    <div>
      <AboutCard member={member}/>
    </div>
  ));
  
  return ( 
      <div>
        <Slider 
        dots={true}
        slidesToShow={3}
        autoplay={true}>
        {renderSlides()}
        </Slider>
      </div>
    );
}