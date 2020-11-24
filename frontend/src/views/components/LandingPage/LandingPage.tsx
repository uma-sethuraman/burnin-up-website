import React from "react";
import LandingButton from "./LandingButton";
import WebFont from "webfontloader";
import {BsChevronDoubleDown, BsChevronDoubleUp} from "react-icons/bs";
import {useEffect} from "react";
import "./LandingPage.css";

/* home page */
function LandingPage() {
  /* loading fonts */
  WebFont.load({
    google: {
      families: [
        "serif",
        "Raleway",
        "sans-serif",
      ],
    },
  });
  
  /* indicates if home page arrow points up or down */
  const [arrowType, setArrowType] = React.useState<string>("down");

  /* update arrow direction on scroll */
  const handleScroll = () => {
    if (window.scrollY > 50) 
      setArrowType("up");
    else
      setArrowType("down");
  };
      
  /* add scroll event listener to window */
  useEffect(() =>{
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* what happens when the arrow is clicked */
  function arrowClick () {
    if (arrowType === "down") {
      /* scroll down */
      window.scrollTo({top: 10000, left: 0, behavior: 'smooth'});
    }
    else {
      /* scroll up */
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }
  
  return (
    <div className="Landing">
      {/* header */}
      <header className="Landing-header">
        <div style={{marginTop: "150px"}}>
        <h3> OUR WORLD IS BURNING UP </h3>
        <h1 >it's "burnin' up, burnin' up for you baby" - Jonas Brothers </h1>
        </div>
        {/* displays up or down arrow */}
        <div className="arrow">     
          {arrowType === "down"?
          <BsChevronDoubleDown size={75} onClick={()=>arrowClick()}/>:
          <BsChevronDoubleUp size={75} onClick={()=>arrowClick()}/>}
        </div>
      </header>
      {/* summary */}
      <div className="Landing-body">
        <br></br>
        <div className="story">
          <div className="story-header">
            <h1>OUR PURPOSE</h1>
          </div>
          <p>
            Earth’s climate is changing faster than ever. Our website shows a
            clear picture of how fast and how far the climate has changed around
            the world in the past decades and encourages people to take action
            to help the environment.
          </p>
        </div>
        {/* links to the three models */}
        <LandingButton />
      </div>
    </div>
  );
}

export default LandingPage;
