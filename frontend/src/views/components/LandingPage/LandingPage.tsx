import React from "react";
import LandingButton from "./LandingButton";

import "./LandingPage.css";

/* home page */
function LandingPage() {
  return (
    <div className="Landing">
      {/* header */}
      <header className="Landing-header">
        {/* <div className="hook"> */}
        <h3> Our world is burning up. </h3>
        <h2>it's "burnin' up, burnin' up for you baby" - Jonas Brothers </h2>
        {/* </div> */}
      </header>
      {/* summary */}
      <div className="Landing-body">
        <br></br>
        <div className="story">
          <p>Our Purpose</p>
          <p>
            Earth’s climate is changing faster than ever. The emission of
            pollutants in the air can result in serious changes to the climate.
            These pollutants can be extremely dangerous with harmful effects for
            public health, ecosystems, and agricultural productivity. We want
            people to realize how serious the issue is by showing data that
            captures the impact of climate change around the world. We hope that
            our website shows a clear picture of how fast and how far the
            climate has changed around the world in the past decades and
            encourages people to take action to help the environment.
          </p>
        </div>
        {/* links to the three models */}
        <h3 style={{ color: "#556875" }}>Explore</h3>
        <LandingButton/>
      </div>
    </div>
  );
}

export default LandingPage;
