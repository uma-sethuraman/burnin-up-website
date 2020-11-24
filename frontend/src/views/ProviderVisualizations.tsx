import React from "react";
import Navbar from "./components/OurNavbar";
import "./ProviderVisualizations.css";
import PieChart from "./components/Visualizations/PieChart";
import manufacturers from "../vizdata/Manufacturer.json";
import BarChart from "./components/Visualizations/BarChart";
import energy_sources from "../vizdata/energy_sources.json";
import BubbleChart from "./components/Visualizations/BubbleChart";
import fuelingstations from "../vizdata/FuelingStationsPerState.json";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import WebFont from "webfontloader";
import Container from '@material-ui/core/Container';

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
function ProviderVisualizations() {
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
    <div className="ProviderVisuals">
      <Navbar />
      <div className="ProviderVisuals-body">
        <h3>Provider Visualizations</h3>
        <a href="https://econyoom.me">
          <h2><u>EcoNyoom</u></h2>
        </a>
        <br />
        <div className="provider-visuals-appbar">
          {/* appbar for navigating between visualizations */}
          <AppBar
            position="static"
            style={{ background: "#000000", fontFamily: "Raleway" }}
          >
            <Tabs
              value={value} centered onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                label={
                  <div className="provider-vis-app-bar">Vehicles</div>}
                  {...a11yProps(0)}
              />
              <Tab
                label={
                  <div className="provider-vis-app-bar">Fueling Stations</div>}
                  {...a11yProps(1)}
              />
              <Tab
                label={
                  <div className="provider-vis-app-bar">Energy</div>}
                  {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
        </div>
        {/* tab for countries visualization */}
        <TabPanel value={value} index={0}>
          <div className="provider-tabs">
            <br/>
            <h2 className="provider-vis-app-bar">
              Number of Eco-Friendly Cars Per Manufacturer:
            </h2>
            <PieChart data={manufacturers} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <div className="provider-tabs">
        <br/>
          <h2 className="provider-vis-app-bar">
            Number of Fueling Stations per State in the US:
          </h2>
          <BubbleChart 
            data={fuelingstations} zoom={0.85} offsetX={0.0}
            height={1500} legendPercentage={15}
          />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <div className="provider-tabs">
        <br/>
          <h2 className="provider-vis-app-bar">
            Total Power per Energy Source
          </h2>
          <BarChart
            data={energy_sources} xAttr="energe" yAttr="power"
            xLabel="Energy Source" yLabel="Total Power (MWh)"
          />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

export default ProviderVisualizations;
