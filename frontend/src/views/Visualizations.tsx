import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import climate from "../assets/fightClimate.png";
import country from "../vizdata/countries.json"

import PieChart from "./components/Visualizations/PieChart";
import ConnectedScatterplot from "./components/Visualizations/ConnectedScatterplot";
import carbonemissions from "../vizdata/CarbonEmissions.json";
import Choropleth from "./components/Visualizations/choropleth";
import BarChart from "./components/Visualizations/BarChart";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import citytemps from "../vizdata/CityRecentTemps.json";

/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <Image src={climate} fluid />
        <div className="Visuals-body">
		<h2>country emission barchart</h2>
          <BarChart data={country} xAttr="country" yAttr="emissions" />
          <br />
          <h2>Recent City Temperatures:</h2>
          <BubbleChart
						// graph={{
						// 	zoom: 0.75,
						// 	offsetX: 0.15,
						// 	offsetY: -0.01
						// }}
						width={1100}
						height={900}
						padding={15} // optional value, number that set the padding between bubbles
						showLegend={true} // optional value, pass false to disable the legend.
						legendPercentage={20} // number that represent the % of with that legend going to use.
						legendFont={{
							family: 'Arial',
							size: 16,
							color: '#FFFFFF',
							weight: 'bold'
						}}
						valueFont={{
							family: 'Arial',
							size: 12,
							color: '#fff',
							weight: 'bold'
						}}
						labelFont={{
							family: 'Arial',
							size: 16,
							color: '#fff',
							weight: 'bold'
            }}
            data={citytemps}
					/>
          <br />
          <div className="carbonemissions-vis">
            <h2>help me</h2>
            <br />
            <ConnectedScatterplot data={carbonemissions} xAttr="Year" yAttr="CarbonEmissions" xMin={1880} xMax={2020} yMin={200} yMax={500} xLabel="Year" yLabel="Carbon Emissions (ppm)" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visuals;
