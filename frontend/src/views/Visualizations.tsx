import React from "react";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import BarChart from "./components/Visualizations/BarChart";
import country from "../vizdata/countries.json";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import citytemps from "../vizdata/CityRecentTempsRanges.json";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import carbonemissions from "../vizdata/CarbonEmissions.json";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import WebFont from "webfontloader";

/* allows for tabs in the appbar  */
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

/* props to be used in TabPanel */
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

/* distinguishes tabs on appbar */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/* page for Visualizations */
function Visuals() {
  const [value, setValue] = React.useState(0);

  /* event listener for navigating tabs */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  WebFont.load({
    google: {
      families: ["serif", "Raleway", "sans-serif"],
    },
  });

  return (
    <div className="Visuals">
      <Navbar />

      <div className="Visuals-body">
        <h3>Our Visualizations</h3>
        <br />
        <div className="visuals-appbar">
          {/* appbar for navigating between visualizations */}
          <AppBar
            position="static"
            style={{ background: "#000000", fontFamily: "Raleway" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab
                label={<div className="vis-app-bar">Countries</div>}
                {...a11yProps(0)}
              />
              <Tab
                label={<div className="vis-app-bar">Cities</div>}
                {...a11yProps(1)}
              />
              <Tab
                label={<div className="vis-app-bar">Annual Climate Change</div>}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
        </div>
        {/* tab for countries visualization */}
        <TabPanel value={value} index={0}>
          <h2 className="vis-app-bar">
            Top 50 Countries with The Highest Carbon Emissions
          </h2>
          <BarChart
            data={country}
            xAttr="country"
            yAttr="emissions"
            xLabel="Countries"
            yLabel="Carbon Emissions (ppm)"
          />
        </TabPanel>
        {/* tab for cities visualization */}
        <TabPanel value={value} index={1}>
          <h2 className="vis-app-bar">
            Recent City Temperatures Worldwide Grouped by Range:
          </h2>
          <BubbleChart
            graph={{
              zoom: 0.75,
              offsetX: 0.15,
              offsetY: -0.01,
            }}
            width={1400}
            height={1000}
            padding={15}
            showLegend={true}
            legendPercentage={20}
            legendFont={{
              family: "Arial",
              size: 16,
              color: "#FFFFFF",
              weight: "bold",
            }}
            valueFont={{
              family: "Arial",
              size: 12,
              color: "#fff",
              weight: "bold",
            }}
            labelFont={{
              family: "Arial",
              size: 16,
              color: "#fff",
              weight: "bold",
            }}
            data={citytemps}
          />
        </TabPanel>
        {/* tab for annual climate change visualization */}
        <TabPanel value={value} index={2}>
          <div className="carbonemissions-vis" style={{ color: "white" }}>
            <h2 className="vis-app-bar">
              Mean Global Carbon Emissions from 1880-2020
            </h2>
            <LineChart
              width={1000}
              height={500}
              data={carbonemissions}
              margin={{ top: 20, right: 20, left: 300, bottom: 20 }}
            >
              <XAxis
                dataKey="Year"
                stroke="white"
                label={{
                  value: "Year",
                  position: "insideBottomRight",
                  dx: -250,
                  dy: 25,
                  fill: "white",
                  fontSize: 20,
                }}
                tick={{ fontSize: 12 }}
                domain={["dataMin", "dataMax"]}
                type="number"
                tickCount={16}
              />
              <YAxis
                dataKey="CarbonEmissions"
                stroke="white"
                label={{
                  value: "Carbon Emissions (ppm)",
                  position: "insideLeft",
                  angle: -90,
                  dx: -10,
                  dy: 90,
                  fill: "white",
                  fontSize: 20,
                }}
                tick={{ fontSize: 12 }}
                domain={[270, "auto"]}
                tickCount={35}
                interval={1}
              />
              <Line
                type="monotone"
                dataKey="CarbonEmissions"
                stroke="white"
                dot={false}
                strokeWidth="3"
              />
            </LineChart>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

export default Visuals;
