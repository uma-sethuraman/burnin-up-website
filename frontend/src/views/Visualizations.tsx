import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./Visualizations.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import climate from "../assets/fightClimate.png";
import PieChart from "./components/Visualizations/PieChart";

/* page for Helpful Links */
function Visuals() {
  return (
    <div className="Visuals">
      <Navbar />
      <h1>Visualizations</h1>
      <div className="Visuals-header">
        <Image src={climate} fluid />
        <div className="Visuals-body">
          <PieChart />
          {/* <BarChart data={[5,10,1,3]} size={[500,500]} /> */}
          {/* <Scatterplot /> */}
          {/* data={data_arr} xAttr="price" yAttr="priceCount" xMax={1000} yMax={250} xLabel="Average Ticket Price" yLabel="Number of Concerts"  */}
          <br />
          <div className="row">
            <div className="p_Visuals">
              <a href="https://www.rainforestcoalition.org/">
                <Image src={crfn_img} />
                <br />
                Coalition for Rainforest Nations
              </a>

              <br />

              <i>
                "The Coalition for Rainforest Nations (CfRN or the ‘Coalition)
                assists tropical governments, communities and peoples
                responsibly manage their rainforests. Healthy rainforests
                protect against a changing climate, generate needed biodiversity
                and provide safe habitats."
              </i>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="p_Visuals">
              <a href="https://www.catf.us/">
                <Image src={catf_img} />
                <br />
                Clean Air Task Force
              </a>
              <br />
              <i>
                "Our task is to reduce climate change by applying an
                overwhelming amount of force to some of the biggest levers to
                reduce carbon and other climate warming emissions.
                <br />
                Through technology innovation, policy change, and thought
                leadership, the Clean Air Task Force drives impact to prevent
                catastrophic climate change through realistic solutions."
              </i>
            </div>
            <br />
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Visuals;
