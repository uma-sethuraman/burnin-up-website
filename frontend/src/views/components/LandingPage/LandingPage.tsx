import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="Landing">
      <header className="Landing-header">
        <div className="hook">
          <h3> Our world is burning up. </h3>
          <h2>it's "burning up, burning up for you baby." - Jonas Brothers </h2>
        </div>
      </header>
      <body className="Landing-body">
        <br></br>
        <div className="story">
          Earth’s climate is changing faster than ever. The emission of pollutants in the air can result in
          serious changes to the climate. These pollutants can be extremely dangerous with harmful effects for
          public health, ecosystems, and agricultural productivity. We want people to realize how serious the issue
          is by showing data that captures the impact of climate change around the world. We hope that our website shows
          a clear picture of how fast and how far the climate has changed around the world in the past decades and encourages
          people to take action to help the environment.
        </div>

        <h3 style={{ color: "white" }}>Explore</h3>
        <div className="row">
          <div className="columnsLanding">
            <Image
              src={require("../../../assets/austin-capitol.jpg")}
              height="250"
            />
            <Button variant="outline-light" href="/cities">
              Cities
              </Button>{" "}
          </div>
          <div className="columnsLanding">
            <Image
              src={require("../../../assets/beijing-skyline.jpg")}
              height="250"
            />
            <Button variant="outline-light" href="/countries">
              Countries
              </Button>{" "}
          </div>
          <div className="columnsLanding">
            <Image
              src={require("../../../assets/landing-bg.jpg")}
              height="250"
            />
            <Button variant="outline-light" href="/climateChange">
              Climate Change
              </Button>{" "}
          </div>
        </div>
      </body>
    </div>
  );
}

export default LandingPage;
