import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide from "../../Slide";
import Image from "react-bootstrap/Image";
import "./OurCarousel.css";

function OurCarousel(slide1: Slide, slide2: Slide, slide3: Slide) {
  return (
    <Carousel>
      <Carousel.Item>
        <Image className="carousel-image" src={slide1.src} alt="First Slide" />
        <Carousel.Caption>
          <h3 className="text">{slide1.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="carousel-image" src={slide2.src} alt="Second slide" />
        <Carousel.Caption>
          <h3 className="text">{slide2.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="carousel-image" src={slide3.src} alt="Third slide" />
        <Carousel.Caption>
          <h3 className="text">{slide3.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default OurCarousel;
