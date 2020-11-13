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

/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <div className="Ticket-vis">
            <h2>help me</h2>
            <br />
            <ConnectedScatterplot data={carbonemissions} xAttr="Year" yAttr="CarbonEmissions" xMax={1000} yMax={250} xLabel="Year" yLabel="Carbon Emissions (ppm)" />
        </div>
      </div>
    </div>
  );
}

export default Visuals;
