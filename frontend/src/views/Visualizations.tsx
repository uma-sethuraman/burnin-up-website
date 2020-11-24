import React from "react";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import BarChart from "./components/Visualizations/BarChart";
import country from "../vizdata/countries.json";
import BubbleChart from "./components/Visualizations/BubbleChart";
import LineChart from "./components/Visualizations/MyLineChart";
import citytemps from "../vizdata/CityRecentTempsRanges.json";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import WebFont from "webfontloader";
import Container from '@material-ui/core/Container';
import carbonemissions from "../vizdata/CarbonEmissions.json";

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
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
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
              value={value} onChange={handleChange}
              aria-label="simple tabs example" centered
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
          <br />
          <h2 className="vis-app-bar">
            Top 50 Countries with The Highest Carbon Emissions
          </h2>
          {/* use barchart visualization to display data */}
          <BarChart
            data={country} xAttr="country" yAttr="emissions"
            xLabel="Countries" yLabel="Carbon Emissions (ppm)"
          />
        </TabPanel>
        {/* tab for cities visualization */}
        <TabPanel value={value} index={1}>
          <br />
          <h2 className="vis-app-bar">
            Recent City Temperatures Worldwide Grouped by Range:
          </h2>
          {/* use bubblechart visualization to display data */}
          <BubbleChart 
            data={citytemps} zoom={0.75} offsetX={0.15}
            height={1000} legendPercentage={20}
          />
        </TabPanel>
        {/* tab for annual climate change visualization */}
        <TabPanel value={value} index={2}>
          <br />
          <div className="carbonemissions-vis">
            <h2 className="vis-app-bar">
              Mean Global Carbon Emissions from 1880-2020
            </h2>
            <br />
            {/* use linechart visualization to display data */}
            < LineChart 
              data={carbonemissions}
            />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

export default Visuals;
