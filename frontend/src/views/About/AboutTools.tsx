import React from "react";
import "./About.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

/* importing images for tools and data sections */
import PostmanLogo from "../../assets/PostmanLogo.png";
import GitlabLogo from "../../assets/GitlabLogo.jpg";
import ReactLogo from "../../assets/ReactLogo.jpg";
import ReactBootstrapLogo from "../../assets/ReactBootstrap.png";
import ElasticBeanstalkLogo from "../../assets/ElasticBeanstalk.png";
import NameCheapLogo from "../../assets/NameCheapLogo.png";
import DiscordLogo from "../../assets/DiscordLogo.png";
import JupyterNotebookLogo from "../../assets/jupyter-notebook.jpg";
import AlgoliaLogo from "../../assets/algolialogo.png"
import AboutToolSetCard from "./AboutToolSetCard";

/* displays tools section on About Us page */
const tools = [
  {
    src: ReactLogo,
    caption: "React:", 
    purpose: " renders website and connects user-interface to backend",
    href: "https://reactjs.org/",
    key: 0
  },
  {
    src: ReactBootstrapLogo,
    caption: "ReactBootstrap:", 
    purpose: " CSS framework for website",
    href: "https://react-bootstrap.github.io/",
    key: 1
  },
  {
    src: PostmanLogo,
    caption: "Postman:", 
    purpose: " create Burnin' Up API",
    href: "https://www.postman.com/",
    key: 2
  },
  {
    src: GitlabLogo,
    caption: "GitLab:", 
    purpose: " holds repository",
    href: "https://www.gitlab.com/",
    key: 3
  },
  {
    src: NameCheapLogo,
    caption: "NameCheap:", 
    purpose: " website name",
    href: "https://www.namecheap.com/",
    key: 4
  },
  {
    src: DiscordLogo,
    caption: "Discord:", 
    purpose: " group communication",
    href: "https://www.discord.com/",
    key: 5
  },
  {
    src: JupyterNotebookLogo,
    caption: "Jupyter Notebook:", 
    purpose: " used to parse data",
    href: "https://jupyter.org/",
    key: 6
  },
  {
    src: ElasticBeanstalkLogo,
    caption: "AWS Elastic Beanstalk:", 
    purpose: " hosts website from Git Repository",
    href: "https://aws.amazon.com/elasticbeanstalk/",
    key: 7
  },
  {
    src: AlgoliaLogo,
    caption: "Algolia:", 
    purpose: " powers site search",
    href: "https://www.algolia.com/",
    key: 8
  },
];

const renderSlides = () =>
  tools.map((tool) => (
    <div key={tool.key}>
      <AboutToolSetCard toolset={tool} />
    </div>
  ));

function AboutTools() {
  return (
    <div>
      <div className="p_about">
        <h2>Tools</h2>
        <br/>
        <Slider dots={true}
          autoplay={true}
        slidesToShow={4}>
          {renderSlides()}
        </Slider>
      </div>
    </div>
  );
}

export default AboutTools;
