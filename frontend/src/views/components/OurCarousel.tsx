import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide from "./Slide";
import Image from "react-bootstrap/Image";
import "./OurCarousel.css";
import { Link } from "react-router-dom";

/* an image carousel consisting of the passed in slides */
function OurCarousel(slide1: Slide, slide2: Slide, slide3: Slide) {
  return (

    /* displays the three slides and their captions */
    <Carousel>
      <Carousel.Item>
        <Link to={slide1.countryLink}>
          <Image className="carousel-image" src={slide1.src} alt="First Slide"/>
        </Link>
        <Carousel.Caption>
          <h3 className="text">{slide1.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={slide2.countryLink}>
        <Image className="carousel-image" src={slide2.src} alt="Second slide" />
      </Link>
        <Carousel.Caption>
          <h3 className="text">{slide2.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={slide3.countryLink}>
        <Image className="carousel-image" src={slide3.src} alt="Third slide" />
      </Link>
        <Carousel.Caption>
          <h3 className="text">{slide3.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default OurCarousel;
