import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import climate from "../assets/fightClimate.png";
import PieChart from "./components/Visualizations/PieChart";
import ConnectedScatterplot from "./components/Visualizations/ConnectedScatterplot";

import carbonemissions from "../vizdata/CarbonEmissions.json";
import Choropleth from "./components/Visualizations/choropleth";

/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <Image src={climate} fluid />
        <div className="Visuals-body">
          {/* <PieChart /> */}
          <p>Choropleth graph: </p>
          <Choropleth />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Visuals;
