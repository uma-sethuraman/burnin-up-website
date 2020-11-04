import React from "react";
import "./About.css";
import Image from "react-bootstrap/Image";

/* importing images for tools and data sections */
import PostmanLogo from "../../assets/PostmanLogo.png";
import GitlabLogo from "../../assets/GitlabLogo.jpg";
import ReactLogo from "../../assets/ReactLogo.jpg";
import ReactBootstrapLogo from "../../assets/ReactBootstrap.png";
import ElasticBeanstalkLogo from "../../assets/ElasticBeanstalk.png";
import NameCheapLogo from "../../assets/NameCheapLogo.png";
import DiscordLogo from "../../assets/DiscordLogo.png";
import JupyterNotebookLogo from "../../assets/JupyterNotebook.svg";

/* displays tools section on About Us page */
function AboutTools() {
    return(
    <div className="Tools">
        <h2>Tools</h2>
        <div className="Toolcolumn">
          <a href="https://reactjs.org/" >
            <Image className="ToolImage" src={ReactLogo} />
          </a>
          <figcaption className="caption">React: renders website and connects user-interface to backend </figcaption>
        </div>

        <div className="Toolcolumn">
          <a href="https://react-bootstrap.github.io/" >
            <Image className="ToolImage" src={ReactBootstrapLogo} />
          </a>
          <figcaption className="caption">ReactBootstrap: CSS framework for website </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://aws.amazon.com/elasticbeanstalk/" >
            <Image className="ToolImage" src={ElasticBeanstalkLogo} />
          </a>
          <figcaption className="caption">AWS Elastic Beanstalk: hosts website from Git Repository </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.postman.com/" >
            <Image className="ToolImage" src={PostmanLogo} />
          </a>
          <figcaption className="caption">Postman: create Burnin' Up API </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.gitlab.com/" >
            <Image className="ToolImage" src={GitlabLogo} />
          </a>
          <figcaption className="caption">GitLab: holds repository</figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.namecheap.com/" >
            <Image className="ToolImage" src={NameCheapLogo} />
          </a>
          <figcaption className="caption">NameCheap: website name </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://www.discord.com/" >
            <Image className="ToolImage" src={DiscordLogo} />
          </a>
          <figcaption className="caption">Discord: group communication </figcaption>
        </div>
        <div className="Toolcolumn">
          <a href="https://jupyter.org/" >
            <Image className="ToolImage" src={JupyterNotebookLogo} />
          </a>
          <figcaption className="caption">Jupyter Notebook: used to parse data</figcaption>
        </div>
    </div>
    );
}

export default AboutTools;