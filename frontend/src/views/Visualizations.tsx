import React from "react";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import country from "../vizdata/countries.json"

import energy_sources from "../vizdata/energy_sources.json"

import PieChart from "./components/Visualizations/PieChart";
import carbonemissions from "../vizdata/CarbonEmissions.json";
import BarChart from "./components/Visualizations/BarChart";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import citytemps from "../vizdata/CityRecentTempsRanges.json";
import fuelingstations from "../vizdata/FuelingStationsPerState.json";
import manufacturers from "../vizdata/Manufacturer.json";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
	LineChart, Line, XAxis, YAxis
} from 'recharts';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
		>
		{value === index && (
			<Box p={3}>
			<Typography>{children}</Typography>
			</Box>
		)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	  backgroundColor: theme.palette.background.paper,
	},
}));

/* page for Helpful Links */
function Visuals() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};	

	return (
		<div className="Visuals">
			<Navbar />
		
			<div className="Visuals-body">
				<h3>Visualizations</h3>
				<br />

				<AppBar position="static" style={{ background : '#000000'}} >
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered >
						<Tab label="Countries" {...a11yProps(0)} />
						<Tab label="Cities" {...a11yProps(1)} />
						<Tab label="Annual Climate Change" {...a11yProps(2)} />
						<Tab label="Provider's Visualizations" {...a11yProps(3)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<h2>Top 50 Countries with Highest Carbon Emissions</h2>
					{ <BarChart data={country} xAttr="country" yAttr="emissions" xLabel="Countries" yLabel="Emissions"/>} 
				</TabPanel>
				<TabPanel value={value} index={1}>
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
				</TabPanel>
				<TabPanel value={value} index={2}>
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
				</TabPanel>
				<TabPanel value={value} index={3}>
					<h2>Number of Fueling Stations per State in the US:</h2>
					<BubbleChart
						graph={{
							zoom: 0.90,
							offsetX: 0.00,
							offsetY: -0.01
						}}
						width={1400}
						height={1000}
						padding={15} 
						showLegend={true} 
						legendPercentage={20} 
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
					<br />
					<br />
					<h2>Number of Eco-Friendly Cars Per Manufacturer:</h2>
					{<PieChart data={manufacturers} />}
					<br />
					<br />
					<h2>Energy Resource vs Total Power</h2>
					{<BarChart data={energy_sources} xAttr="energe" yAttr="power" xLabel="Energy" yLabel="Power"/>}
				</TabPanel>
			
			</div>
		</div>
	);
}

export default Visuals;
