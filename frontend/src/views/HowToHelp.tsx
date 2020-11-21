import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./HowToHelp.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import rainforest_img from "../assets/rainforestfoundation.jpeg";

/* page for Helpful Links */
function HowToHelp() {
  return (
    <div className="HowToHelp">
      <Navbar />
      <header className="image-header">
        <div>
          <h1 className="h1-style"> How to Help </h1>
        </div>
      </header>
      <div className="HowToHelp-header">
        <br/>
        <div className="HowToHelp-body">
          <div className="row">
            <div className="p_howtohelp">
              <a className="resource-title" href="https://www.rainforestcoalition.org/">
                <Image className="row-image1" src={crfn_img} />
                <br />
                <u>Coalition for Rainforest Nations</u>
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
            <div className="p_howtohelp">
              <a className="resource-title" href="https://www.catf.us/">
                <Image className="row-image2" src={catf_img} />
                <br />
                <u>Clean Air Task Force</u>
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
          <div className="row">
            <div className="p_howtohelp">
              <a className="resource-title" href="https://rainforestfoundation.org/">
                <Image className="row-image1" src={rainforest_img} />
                <br />
                <u>Rainforest Foundation US</u>
              </a>

              <br />

              <i>
                "The 2020 fire season in the Amazon is just as devastating if not 
                worse than those that captured the world’s attention in 2019. 
                Rainforest Foundation US is closely tracking the fires and working 
                with partners to actively prevent and respond to the threat of fires 
                in their communities."
              </i>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default HowToHelp;
