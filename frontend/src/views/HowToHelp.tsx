import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./HowToHelp.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import climate from "../assets/fightClimate.png";

/* page for Helpful Links*/
function HowToHelp() {
  return (
    <div className="HowToHelp">
      <Navbar />
      <h1>How You Can Help</h1>
      <div className="HowToHelp-header">
        <Image src={climate} fluid />
        <div className="HowToHelp-body">
          <br />
          <div className="row">
            <div className="p_howtohelp">
              <a href="https://www.rainforestcoalition.org/">
                <Image src={crfn_img} />
                <br/>
                Coalition for Rainforest Nations
              </a>

              <br />
              
              <i>"The Coalition for Rainforest Nations (CfRN or the ‘Coalition) assists tropical governments, communities and peoples responsibly manage their rainforests. Healthy rainforests protect against a changing climate, generate needed biodiversity and provide safe habitats."</i>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="p_howtohelp">
              <a href="https://www.catf.us/">
                <Image src={catf_img} />
                <br />
                Clean Air Task Force
              </a>
              <br />
              <i>"Our task is to reduce climate change by applying an overwhelming amount of force to some of the biggest levers to reduce carbon and other climate warming emissions.
              <br />
              Through technology innovation, policy change, and thought leadership, the Clean Air Task Force drives impact to prevent catastrophic climate change through realistic solutions."</i>
            </div>
            <br />
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default HowToHelp;