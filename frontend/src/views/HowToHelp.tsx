import React from "react";
import Image from "react-bootstrap/Image";
import Navbar from "./components/OurNavbar";
import "./HowToHelp.css";
import catf_img from "../assets/CATF.png";
import crfn_img from "../assets/cfrn-min.png";
import rainforest_img from "../assets/rainforestfoundation.jpeg";
import ember_img from "../assets/emberlogo.jpeg";
import climate_img from "../assets/climateemergency.jpeg";

/* list of helpful resources */
const resources = [
  {
    href: "https://www.rainforestcoalition.org/",
    src: crfn_img,
    name: "Coalition for Rainforest Nations",
      description:"The Coalition for Rainforest Nations"+
      " (CfRN or the ‘Coalition)"+
      " assists tropical governments, communities and peoples"+
      " responsibly manage their rainforests. Healthy rainforests"+
      " protect against a changing climate, generate needed biodiversity"+
      " and provide safe habitats."
  },
  {
    href: "https://www.catf.us/",
    src: catf_img,
    name: "Clean Air Task Force",
    description:"Our task is to reduce climate change by applying an"+
    " overwhelming amount of force to some of the biggest levers to"+
    " reduce carbon and other climate warming emissions."+
    " Through technology innovation, policy change, and thought"+
    " leadership, the Clean Air Task Force drives impact to prevent"+
    " catastrophic climate change through realistic solutions."
  },
  {
    href: "https://rainforestfoundation.org/",
    src: rainforest_img,
    name: "Rainforest Foundation US",
    description:"The 2020 fire season in the Amazon is just as devastating if"+
      "  not worse than those that captured the world’s attention in"+
      "  2019. Rainforest Foundation US is closely tracking the fires and"+
      "  working with partners to actively prevent and respond to the"+
      "  threat of fires in their communities."
  },
  {
    href: "https://ember-climate.org/",
    src: ember_img,
    name: "Ember",
    description:"Ember's objective is to accelerate the global electricity"+
      " transition from coal to clean energy. Ember uses its data and"+
      " analysis to support high impact, viable policies that accelerate"+
      " the coal phase-out, empower campaign organizations, and shape"+
      " the global narrative on coal."
  },
  {
    href: "https://climateemergencyfund.org/",
    src: climate_img,
    name: "Climate Emergency Fund",
    description: "We fund the most impactful climate activists working to"+ 
        " disrupt the status quo, inspire others to do the same and force"+
        " policy-makers to take action. Our role in winning the future is"+
        " to turbocharge activism, to put pressure on government leaders,"+
        " divest from fossil fuel financing, and diversify the movement by"+
        " engaging new voices."
  }
];

/* page for Helpful Links */
function HowToHelp() {
  return (
    <div className="HowToHelp">
      <Navbar />
      <header className="image-header">
        <div>
          <h1 className="h1-style"> How to Help </h1>
        </div>
        <br/>
        <div className="instructions">
            “What you do makes a difference, and you have to decide what kind
            of difference you want to make.”
            <br/>
            -Dr. Jane Goodall
        </div>
      </header>
      
      {/* display resources */}
      <div className="HowToHelp-header">
        <div className="HowToHelp-body">
          <br/>
          {resources.map((resource) => (
            <div className="row">
              <div className="p_howtohelp">
                <a className="resource-title" href={resource.href}>
                  <Image className="row-image4" src={resource.src} />
                  <br />
                  <u>{resource.name}</u>
                </a>
                <br />
                <i>{resource.description} </i>
              </div>
              <br />
            </div>
          ))}
          <br/>
          <div className="instructions">
            <p>"I'm tryna keep from goin' under" - Jonas Brothers 2008 </p>
            <p>Save the Jonas Brothers</p>
            <p>Save the Earth </p>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default HowToHelp;
