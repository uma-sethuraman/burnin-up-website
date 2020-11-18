import React from "react";
import "./About.css";
import Image from "react-bootstrap/Image";

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
import JupyterNotebookLogo from "../../assets/JupyterNotebook.svg";
import AboutToolCard from "./AboutToolCard";

/* displays tools section on About Us page */
const tools = [
  {
    src: ReactLogo,
    caption: "React: renders website and connects user-interface to backend",
    href: "https://reactjs.org/",
  },
  {
    src: ReactBootstrapLogo,
    caption: "ReactBootstrap: CSS framework for website",
    href: "https://react-bootstrap.github.io/",
  },
  {
    src: PostmanLogo,
    caption: "Postman: create Burnin' Up API",
    href: "https://www.postman.com/",
  },
  {
    src: GitlabLogo,
    caption: "GitLab: holds repository",
    href: "https://www.gitlab.com/",
  },
  {
    src: NameCheapLogo,
    caption: "NameCheap: website name",
    href: "https://www.namecheap.com/",
  },
  {
    src: DiscordLogo,
    caption: "Discord: group communication",
    href: "https://www.discord.com/",
  },
  {
    src: JupyterNotebookLogo,
    caption: "Jupyter Notebook: used to parse data",
    href: "https://jupyter.org/",
  },
  {
    src: ElasticBeanstalkLogo,
    caption: "AWS Elastic Beanstalk: hosts website from Git Repository",
    href: "https://aws.amazon.com/elasticbeanstalk/",
  },
];

const renderSlides = () =>
  tools.map((tool) => (
    <div>
      <AboutToolCard tool={tool} />
    </div>
  ));

function AboutTools() {
  return (
    <div>
      <div className="about-purpose">
        <h2>Tools</h2>
      </div>
      <Slider dots={true}
        autoplay={true}
       slidesToShow={4}>
        {renderSlides()}
      </Slider>
    </div>
  );
}

export default AboutTools;
