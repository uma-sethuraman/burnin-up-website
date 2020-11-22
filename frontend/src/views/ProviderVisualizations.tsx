import React from "react";
import Navbar from "./components/OurNavbar";
import "./ProviderVisualizations.css";
import PieChart from "./components/Visualizations/PieChart";
import manufacturers from "../vizdata/Manufacturer.json";
import BarChart from "./components/Visualizations/BarChart";
import energy_sources from "../vizdata/energy_sources.json";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import fuelingstations from "../vizdata/FuelingStationsPerState.json";
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
          <h2>
            <u>EcoNyoom</u>
          </h2>
        </a>
        <br />
        <div className="provider-visuals-appbar">
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
                label={<div className="provider-vis-app-bar">Vehicles</div>}
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <div className="provider-vis-app-bar">Fueling Stations</div>
                }
                {...a11yProps(1)}
              />
              <Tab
                label={<div className="provider-vis-app-bar">Energy</div>}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
        </div>
        {/* tab for countries visualization */}
        <TabPanel value={value} index={0}>
          <h2 className="provider-vis-app-bar">
            Number of Eco-Friendly Cars Per Manufacturer:
          </h2>
          <PieChart data={manufacturers} />
          <br />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2 className="provider-vis-app-bar">
            Number of Fueling Stations per State in the US:
          </h2>
          <BubbleChart
            graph={{
              zoom: 0.85,
              offsetX: 0.0,
              offsetY: -0.01,
            }}
            width={1400}
            height={1000}
            padding={15}
            showLegend={true}
            legendPercentage={15}
            legendFont={{
              family: "Arial",
              size: 10,
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
            data={fuelingstations}
          />
          <br />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2 className="provider-vis-app-bar">
            Total Power per Energy Source
          </h2>
          <BarChart
            data={energy_sources}
            xAttr="energe"
            yAttr="power"
            xLabel="Energy Source"
            yLabel="Total Power (MWh)"
          />
          <br />
        </TabPanel>
      </div>
    </div>
  );
}

export default ProviderVisualizations;
