import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import country from "../vizdata/countries.json"

import ConnectedScatterplot from "./components/Visualizations/ConnectedScatterplot";
import carbonemissions from "../vizdata/CarbonEmissions.json";
import Choropleth from "./components/Visualizations/choropleth";
import BarChart from "./components/Visualizations/BarChart";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import citytemps from "../vizdata/CityRecentTempsRanges.json";
import fuelingstations from "../vizdata/FuelingStationsPerState.json";
import manufacturers from "../vizdata/Manufacturer.json";

import {
	LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';


/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <div className="Visuals-body">
		  <h2>country emission barchart</h2>
          {/* <BarChart data={country} xAttr="country" yAttr="emissions" /> */}
          <br />
          <h2>Recent City Temperatures Worldwide Grouped by Range:</h2>
          <BubbleChart
				graph={{
					zoom: 0.75,
					offsetX: 0.15,
					offsetY: -0.01
				}}
				width={1400}
				height={1000}
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
            <h2>Mean Global Carbon Emissions from 1880-2020</h2>
            {/* <ConnectedScatterplot data={carbonemissions} xAttr="Year" yAttr="CarbonEmissions" xMin={1880} xMax={2020} yMin={200} yMax={500} xLabel="Year" yLabel="Carbon Emissions (ppm)" /> */}
			<LineChart
				width={1000}
				height={500}
				data={carbonemissions}
				margin={{top: 20, right: 20, left: 300, bottom: 20,}}
			>
				<XAxis dataKey="Year" stroke="white" label={{value: 'Year', position: "insideBottomRight", dx: -250, dy: 25, fill:'white', fontSize: 20}} tick={{fontSize: 12}} domain={['dataMin', 'dataMax']} type='number' tickCount={16}/>
				<YAxis dataKey="CarbonEmissions" stroke="white" label={{value: 'Carbon Emissions (ppm)', position: "insideLeft", angle: -90, dx: -10, dy: 90, fill:'white', fontSize: 20}} tick={{fontSize: 12}} domain={[270, 'auto']} tickCount={35} interval={1} />
				<Line type="monotone" dataKey="CarbonEmissions" stroke="white" dot={false} strokeWidth="3" />
			</LineChart>
		  </div>
		  <br/>
		  <p>Provider's Visualizations</p>
		    <h2>Number of Fueling Stations per State in the US:</h2>
			<BubbleChart
				graph={{
					zoom: 0.90,
					offsetX: 0.00,
					offsetY: -0.01
				}}
				width={1400}
				height={1000}
				padding={15} // optional value, number that set the padding between bubbles
				showLegend={true} // optional value, pass false to disable the legend.
				legendPercentage={20} // number that represent the % of with that legend going to use.
				legendFont={{
					family: 'Arial',
					size: 10,
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
				data={fuelingstations}
			/>
			<h2>Number of Eco-Friendly Cars Per Manufacturer:</h2>
			{/* <PieChart data={manufacturers}/> */}
			{/* <PieChart width={1000} height={800}>
				<Pie dataKey="Count" isAnimationActive={false} data={manufacturers} cx={675} cy={250} outerRadius={200} fill="#8884d8" label />
				<Tooltip />
			</PieChart> */}
			
        </div>
      </div>
    </div>
  );
}

export default Visuals;
