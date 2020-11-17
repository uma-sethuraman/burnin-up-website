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

import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


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
		  
          <div className="carbonemissions-vis" style={{color: "white"}}>
            <h2>help me</h2>
            <br />
            <ConnectedScatterplot data={carbonemissions} xAttr="Year" yAttr="CarbonEmissions" xMin={1880} xMax={2020} yMin={200} yMax={500} xLabel="Year" yLabel="Carbon Emissions (ppm)" />
			{/* <LineChart
				width={1000}
				height={500}
				data={carbonemissions}
				margin={{top: 20, right: 20, left: 20, bottom: 20,}}
			>
				<XAxis dataKey="Year" stroke="white" label={{value: 'Year', color:'white', fontSize: 12}} tick={{fontSize: 12}} domain={['dataMin', 'dataMax']} tickCount={10}/>
				<YAxis dataKey="CarbonEmissions" stroke="white" label={{value: 'Carbon Emissions', color:'white', fontSize: 12}} tick={{fontSize: 12}} />
				<Line type="monotone" dataKey="CarbonEmissions" stroke="#8884d8" dot={false} />
			</LineChart> */}
		  </div>
        </div>
      </div>
    </div>
  );
}

export default Visuals;
