import React from "react";
import "./About.css";
import Navbar from "./components/OurNavbar";
import axios from "axios";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

function About() {

  /* Team member information */
  const [members, changeMembers] = useState<GroupMember[]>([
    {
      name: "Caitlin Lien",
      email: "caitlinlien@utexas.edu",
      username: "caitlinlien"
    },
    {
      name: "Caitlin O'Callaghan",
      email: "caitlinocallaghan@Caitlins-MBP.lan",
      username: "caitlinocallaghan"
    },
    {
      name: "Cherry Sun",
      email: "cherrysun9@utexas.edu",
      username: "cherrysun9"
    },
    {
      name: "Lauren Mangibin",
      email: "lauren.mangibin@gmail.com",
      username: "lauren.mangibin"
    },
    {
      name: "Samantha Tuapen",
      email: "samtuapen@utexas.edu",
      username: "samantha3pen"
    },
    {
      name: "Uma Sethuraman",
      email: "uma.sethuraman@utexas.edu",
      username: "uma-sethuraman"
    },
  ]);

  const [issuesSum, changeIssuesSum] = useState(-1);
  const [commitsSum, changeCommitsSum] = useState(-1);
  const [unittestsSum, changeUnittestsSum] = useState(0);

  /* Retrieves data about GitLab issues per contributor */
  function issuesApiRequest() {

    /* Populates requestArray with all issues requests */
    const requestURL: string =
      "https://gitlab.com/api/v4/projects/21349576/issues_statistics?author_username=";
    const requestArray = [];
    for (const member of members) {
      requestArray.push(axios.get(requestURL + member.username));
    }

    /* Updates issues number for all people in members */
    axios.all([...requestArray]).then(
      axios.spread((...responses) => {
        const membersCopy: GroupMember[] = JSON.parse(JSON.stringify(members));
        let totalIssues = 0;
        for (let i = 0; i < responses.length; i++) {
          const response: Gitlab = JSON.parse(JSON.stringify(responses[i])) as Gitlab;
          membersCopy[i].issues = response.data.statistics.counts.all;
          totalIssues += response.data.statistics.counts.all;
        }
        
        /* Update total number of issues */
        changeIssuesSum(totalIssues);

        changeMembers(old => {
          return [...membersCopy]
        });
      })
    ).catch(errors => {
      console.log(errors.toJSON());
    })
  }
  
  /* Retrieves commit data for all members */
  function commitsApiRequest() {
    axios
      .get(
        "https://gitlab.com/api/v4/projects/21349576/repository/contributors"
      )
      .then((response) => {
        const allCommits: CommitsInfo[] = response.data;

        const membersCopy: GroupMember[] = JSON.parse(JSON.stringify(members));

        let totalCommits = 0;

        /* Iterate over all elements in the array and assign
        each member to their number of commits */
        for (let elem of allCommits) {
          for (let i = 0; i < membersCopy.length; i++) {
            if (elem.email === membersCopy[i].email) {
              membersCopy[i].commits = elem.commits;
              totalCommits += elem.commits;
              break;
            }
          }
        }

        /* Update total number of commits */
        changeCommitsSum(totalCommits);

        /* Update members */
        changeMembers(old => {
          return [...membersCopy]
        });
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }

  return (

    <div className="About">
      {commitsApiRequest()}
      {issuesApiRequest()}
      <Navbar />

      <body className="About-body">
        <div className="h3_about">
          <h3>About Us</h3>
        </div>
        <div className="purpose">
        Burnin’ Up aims to educate people on the climate crisis of our planet, and make them aware of how quickly our home is changing. 
        This website will allow you to navigate from city to city, or country to country, to see how each city or country is contributing to, 
        or has been affected by climate change. You can also see how climate change has been affecting the world on a year by year basis. 
        We encourage you to take action by making small changes in your life to decrease your individual carbon footprint, such as turning off lights 
        you aren’t using, or carpooling with others when you can. By understanding the history of our Earth, we can understand where we will be in the future. 
        <p> </p>

        With the datasets we've compiled together, we've been able to find 
        </div>
        <div className="h2_about">
          <h2>Total Commits: {commitsSum}</h2>
          <h2>Total Issues: {issuesSum}</h2>
          <h2>Total Unit Tests: {unittestsSum}</h2>
        </div>
        <div className="row">
          <div className="h2_about">
            <div className="column">
              <Image
                src={require("../assets/CaitlinLien.JPG")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Caitlin Lien</b>
              </h2>
              <p>Issues: {members[0].issues}</p>
              <p>Commits: {members[0].commits}</p>
              <p>Unit Tests: 0</p>

              <p>Caitlin is a junior from Round Rock, TX. She works on backend development for the site 
                and enjoys Data Science and Machine Learning. Her hobbies 
                include stanning BTS and stretching while working.
                Her computer is currently resting in peace.</p>
            </div>
            <div className="column">
              <Image
                src={require("../assets/caitlin-o-headshot.jpeg")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Caitlin O'Callaghan</b>
              </h2>
              <p>Issues: {members[1].issues}</p>
              <p>Commits: {members[1].commits}</p>
              <p>Unit Tests: 0</p>
              <p>Caitlin is a junior from Dallas, TX. Some of her technical interests are 
                front end web and app development and NLP. Her hobbies include painting 
                and drawing, playing oboe, listening to classical music, and drinking tea.</p>

            </div>
            <div className="column">
              <Image
                src={require("../assets/cherry.jpeg")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Cherry Sun</b>
              </h2>
              <p>Issues: {members[2].issues}</p>
              <p>Commits: {members[2].commits}</p>
              <p>Unit Tests: 0</p>

              <p>Cherry aged at least 5 years from doing this project. She’s working on backend and has
                 interest in overall full stack app development. She likes 
                working out, swimming, getting a massage, going to spa and just enjoying life. </p>
            </div>
            <div className="column">
              <Image
                src={require("../assets/LaurenMangibin-headshot.jpg")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Lauren Mangibin</b>
              </h2>
              <p>Issues: {members[3].issues}</p>
              <p>Commits: {members[3].commits}</p>
              <p>Unit Tests: 0</p>
              <p>Lauren is Junior from Austin, TX whose eyebags got much bigger from sleeping late. She is working on the front end of the site and loves working with people. 
                She is a hip-hop dancer and choreographer for UT dance teams and loves to explore and hike.</p>

            </div>
            <div className="column">
              <Image
                src={require("../assets/samantha-headshot.jpg")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Samantha Tuapen</b>
              </h2>
              <p>Issues: {members[4].issues}</p>
              <p>Commits: {members[4].commits}</p>
              <p>Unit Tests: 0</p>
              <p>Samantha is a junior from Dallas, TX. She’s working on the backend development of 
                this site and has an interest in overall full stack app development. Outside of the CS world, she enjoys journaling,
                 kickboxing, playing musical instruments, and eating good food.</p>
            </div>
            <div className="column">
              <Image
                src={require("../assets/uma-headshot.jpg")}
                height="250"
                roundedCircle
              />
              <h2>
                <b>Uma Sethuraman</b>
              </h2>
              <p>Issues: {members[5].issues}</p>
              <p>Commits: {members[5].commits}</p>
              <p>Unit Tests: 0</p>
              <p>Uma is a junior from Houston, TX. She is working on the frontend development for this project. Some of her other technical 
                interests include mobile development and machine learning. 
                She also enjoys dancing and cooking.</p>
            </div>
          </div>
        </div>
        <div className="h2_about">
          <br></br>
          <h2>
            <a href="https://documenter.getpostman.com/view/12123261/TVRdAWse">
              Our Postman API
              <Image className="ToolImage"src={require("../assets/PostmanLogo.png")}/>      
            </a>
          </h2>
          <br></br>
          <h2>
            <a href="https://gitlab.com/caitlinlien/cs373-sustainability/">
              Our GitLab Repository
              <Image className="ToolImage"src={require("../assets/GitlabLogo.jpg")}/>      
            </a>
          </h2>
          <br></br>
          <div className="Tools">
          Tools:
            <a href="https://reactjs.org/" >
              <Image className="ToolImage"src={require("../assets/ReactLogo.jpg")}/>      
            </a>
            <a href="https://react-bootstrap.github.io/" >
              <Image className="ToolImage"src={require("../assets/ReactBootstrap.png")}/>      
            </a>
            <a href="https://aws.amazon.com/elasticbeanstalk/" >
              <Image className="ToolImage"src={require("../assets/ElasticBeanstalk.png")}/>      
            </a>
            <a href="https://www.postman.com/" >
              <Image className="ToolImage"src={require("../assets/PostmanLogo.png")}/>      
            </a>
            <a href="https://www.gitlab.com/" >
              <Image className="ToolImage"src={require("../assets/GitlabLogo.jpg")}/>      
            </a>
            <a href="https://www.namecheap.com/" >
              <Image className="ToolImage"src={require("../assets/NameCheapLogo.png")}/>      
            </a>
            <a href="https://www.discord.com/" >
              <Image className="ToolImage"src={require("../assets/DiscordLogo.png")}/>      
            </a>
            
          </div>
          <div className="purpose"> 
          Different API and data sources: 
          <li>https://ipstack.com/documentation </li>
          <li> https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries</li> 
          <li> https://docs.openaq.org/  </li>
          <li>https://developer.climacell.co/v3/reference    </li>
          <li>http://geodb-cities-api.wirefreethought.com/   </li>
          <li> https://global-warming.org/  </li>
          <li> https://www.jpl.nasa.gov/edu/teach/activity/graphing-sea-level-trends/  </li>
          <li>https://ourworldindata.org/world-population-growth</li>
          </div>
        </div>
      </body>
    </div>
  );
}

export interface GroupMember {
  name: string;
  email: string;
  username?: string;
  bio?: string;
  commits?: number;
  issues?: number;
  unittest?: number;
}

export interface Gitlab {
  data: Data;
  status: number;
  statusText: string;
  headers: GITLABHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  url: string;
  method: string;
  headers: ConfigHeaders;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Data {
  statistics: Statistics;
}

export interface Statistics {
  counts: Counts;
}

export interface Counts {
  all: number;
  closed: number;
  opened: number;
}

export interface CommitsInfo {
  name: string;
  email: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface GITLABHeaders {
  "cache-control": string;
  "content-type": string;
}

export interface Request {}

export default About;
