import React from "react";
import LandingButton from "./LandingButton";
import WebFont from "webfontloader";

import "./LandingPage.css";

/* home page */
function LandingPage() {
  WebFont.load({
    google: {
      families: [
        "Trirong",
        "Nunito Sans",
        "Quicksand",
        "Vesper Libre",
        "Trocchi",
        "serif",
        "Advantage",
        "Prompt",
        "Big Shoulders Stencil Text",
        "cursive",
        "Raleway",
        "sans-serif",
      ],
    },
  });

  return (
    <div className="Landing">
      {/* header */}
      <header className="Landing-header">
        {/* <div className="hook"> */}
        <h3> OUR WORLD IS BURNING UP. </h3>
        <h1>it's "burnin' up, burnin' up for you baby" - Jonas Brothers </h1>
        {/* </div> */}
      </header>
      {/* summary */}
      <div className="Landing-body">
        <br></br>
        <div className="story">
          <div className="story-header">
            <h1>Our Purpose</h1>
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
