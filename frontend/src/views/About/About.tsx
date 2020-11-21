import React from "react";
import "./About.css";
import Navbar from "../components/OurNavbar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import WebFont from "webfontloader";

/* importing images for all group members */
import UmaSethuraman from "../../assets/uma-headshot.jpg";
import CaitlinOCallaghan from "../../assets/caitlin-o-headshot.jpeg";
import LaurenMangibin from "../../assets/LaurenMangibin-headshot.jpg";
import SamanthaTuapen from "../../assets/samantha-headshot.jpg";
import CatilinLien from "../../assets/CaitlinLien.jpeg";
import CherrySun from "../../assets/cherry.jpeg";
import PostmanLogo from "../../assets/PostmanLogo.png";
import GitlabLogo from "../../assets/GitlabLogo.jpg";

/* importing interfaces and images for tools and data sections */
import AboutTools from "./AboutTools";
import AboutSets from "./AboutSets";
import { GroupMember, Gitlab, CommitsInfo } from "./AboutInterfaces";
import AboutCarousel from "./AboutCarousel";

function About() {
  /* team member information */

  WebFont.load({
    google: {
      families: [
        "Trirong",
        "Staatliches",
        "Quicksand",
        "Vesper Libre",
        "Trocchi",
        "serif",
        "Advantage",
        "Prompt",
        "cursive",
        "Raleway",
        "sans-serif",
        "Montserrat",
      ],
    },
  });

  const [members, changeMembers] = useState<GroupMember[]>([
    {
      name: "Caitlin Lien",
      email: "caitlinlien@utexas.edu",
      username: "caitlinlien",
      image: CatilinLien,
      unittest: 4,
      role: "Backend Project Lead",
      linkedin: "https://www.linkedin.com/in/caitlinlien/",
      bio:
        "Caitlin is a junior from Round Rock, TX. She works on backend" +
        " development for the site and enjoys Data Science and Machine" +
        " Learning. Her hobbies includes baking, playing video games, and" +
        " taking group stretch breaks.",
    },
    {
      name: "Cherry Sun",
      email: "cherrysun9@utexas.edu",
      username: "cherrysun9",
      image: CherrySun,
      unittest: 39,
      role: "Backend",
      linkedin: "https://www.linkedin.com/in/cherry-sun-53289216b/",
      bio:
        "Cherry aged at least 5 years from doing this project. She’s" +
        " working on backend and has interest in overall full stack app" +
        " development. She likes working out, swimming, getting a massage," +
        " going to spa and just enjoying life.",
    },
    {
      name: "Samantha Tuapen",
      email: "samtuapen@utexas.edu",
      username: "samantha3pen",
      image: SamanthaTuapen,
      unittest: 5,
      role: "Backend",
      linkedin: "https://www.linkedin.com/in/samantha-tuapen/",
      bio:
        "Samantha is a junior from Dallas, TX. She’s working on" +
        " backend for the site and has an interest in" +
        " full stack app development. Outside of the CS world, she enjoys" +
        " kickboxing, playing musical instruments, and eating" +
        " good food.",
    },
    {
      name: "Caitlin O'Callaghan",
      email: "caitlinocallaghan@Caitlins-MBP.lan",
      username: "caitlinocallaghan",
      image: CaitlinOCallaghan,
      unittest: 11,
      role: "Frontend",
      linkedin: "https://www.linkedin.com/in/caitlinocallaghan/",
      bio:
        "Caitlin is a junior from Dallas, TX. Some of her technical" +
        " interests are front end web and app development and NLP. Her hobbies" +
        " include painting and drawing, playing oboe, listening to classical " +
        " music, and drinking tea.",
    },
    {
      name: "Lauren Mangibin",
      email: "lauren.mangibin@gmail.com",
      username: "lauren.mangibin",
      image: LaurenMangibin,
      unittest: 9,
      role: "Frontend",
      linkedin: "https://www.linkedin.com/in/lauren-mangibin/",
      bio:
        "Lauren is a junior from Austin, TX whose eyebags got much bigger" +
        " from sleeping late. She is working on the front end of the site" +
        " and loves working with people. She is a hip-hop dancer and" +
        " choreographer for UT dance teams.",
    },
    {
      name: "Uma Sethuraman",
      email: "uma.sethuraman@utexas.edu",
      username: "uma-sethuraman",
      image: UmaSethuraman,
      unittest: 8,
      role: "Frontend Project Lead",
      linkedin: "https://www.linkedin.com/in/uma-sethuraman/",
      bio:
        "Uma is a junior from Houston, TX. She is working on the frontend" +
        " development for this project. Some of her other technical" +
        " interests include mobile development and machine learning. She" +
        " also enjoys dancing and cooking.",
    },
  ]);

  /* cumulative totals for about page statistics */
  const [issuesSum, changeIssuesSum] = useState(-1);
  const [commitsSum, changeCommitsSum] = useState(-1);
  const unittestsSum: number = 64;

  /* create a copy of the members array to apply changes to */
  let membersCopy: GroupMember[] = JSON.parse(JSON.stringify(members));

  /* creates a reference to both members and membersCopy
  to pass into the useEffect */
  const { current: membersRef } = useRef(membersCopy);
  const { current: membersCopyRef } = useRef(members);

  /* make requests to GitLab API to get commit and issue number data */
  useEffect(() => {
    /* populates requestArray with all issues requests */
    const requestURL: string =
      "https://gitlab.com/api/v4/projects/21349576/" +
      "issues_statistics?author_username=";

    const requestArray: any = [];
    for (const member of membersRef) {
      requestArray.push(axios.get(requestURL + member.username));
    }

    /* updates issues number for all people in members */
    axios
      .all([...requestArray])
      .then(
        axios.spread((...responses) => {
          let totalIssues = 0;
          for (let i = 0; i < responses.length; i++) {
            const response: Gitlab = JSON.parse(
              JSON.stringify(responses[i])
            ) as Gitlab;
            membersCopyRef[i].issues = response.data.statistics.counts.all;
            totalIssues += response.data.statistics.counts.all;
          }

          /* update total number of issues */
          changeIssuesSum(totalIssues);
        })
      )
      .catch((errors) => {
        /* development: console.log(errors.toJSON()); */
      });

    /* updates commits number for all group members */
    axios
      .get(
        "https://gitlab.com/api/v4/projects/21349576/repository/contributors"
      )
      .then((response) => {
        /* store commits info for all members */
        const allCommits: CommitsInfo[] = response.data;
        let totalCommits = 0;

        /* iterate over all elements in the array and assign
        each member to their number of commits */
        for (let elem of allCommits) {
          for (let i = 0; i < membersCopyRef.length; i++) {
            if (elem.email === membersCopyRef[i].email) {
              membersCopyRef[i].commits = elem.commits;
              totalCommits += elem.commits;
              break;
            }
          }
        }

        /* update total number of commits */
        changeCommitsSum(totalCommits);

        /* update members array once with all changes */
        changeMembers((old) => {
          return [...membersCopyRef];
        });
      })
      .catch(function (error) {
        /* development: console.log(errors.toJSON()); */
      });
  }, [membersRef, membersCopyRef]);

  return (
    <div className="About">
      <Navbar />

      <div className="About-body">
        <div className="h3_about">
          <h3>About Us</h3>
        </div>

        {/* describing general purpose of website */}
        <div className="about-purpose">
          Burnin’ Up aims to educate people on the climate crisis of our planet
          and make them aware of how quickly our home is changing. This website
          will allow you to navigate between cities and countries to see how
          each city or country is affected by and contributing to climate
          change. You can also see how climate change has been affecting the
          world on a year by year basis. We encourage you to take action by
          making small changes in your life to decrease your individual carbon
          footprint, such as turning off lights you aren’t using, or carpooling
          with others when you can. By understanding the history of our Earth,
          we can understand where we will be in the future.
        </div>
        <div className="about-purpose">
          The compilation of our data allows us to expand our views on climate
          change to other areas of the world. We often only hear about the state
          of our environment within our own countries or regions. The
          visualizations and graphs we show help us understand how drastic the
          changes are worldwide and throughout history.
        </div>

        <br></br>

        <div className="h2_about">
          <h2>Meet the Team</h2>
        </div>
        <br />
        {/* member info */}
        <AboutCarousel members={members} />
        <br />
        <br />
        {/* total commits, issues, and unit tests */}
        <div className="h2_about">
          <div className="row">
            <div className="col-sm-4">
              {commitsSum === -1 ? (
                <h2>Total Commits: </h2>
              ) : (
                <h2>Total Commits: {commitsSum}</h2>
              )}
            </div>
            <div className="col-sm-4">
              {issuesSum === -1 ? (
                <h2>Total Issues: </h2>
              ) : (
                <h2>Total Issues: {issuesSum}</h2>
              )}
            </div>
            <div className="col-sm-4">
              <h2>Total Unit Tests: {unittestsSum}</h2>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                <a href="https://documenter.getpostman.com/view/12123261/TVRdAWse">
                  <u>Our Postman API</u>
                  <br></br>
                  <Image className="ToolImage" src={PostmanLogo} />
                </a>
              </h2>
            </div>
            <div className="col-sm-6">
              <h2>
                <a href="https://gitlab.com/caitlinlien/cs373-sustainability/">
                  <u>Our GitLab Repository</u>
                  <br></br>
                  <Image className="ToolImage" src={GitlabLogo} />
                </a>
              </h2>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* datasets and APIs */}
        <AboutSets />
        <br></br>
        {/* tools sections */}
        <AboutTools />
      </div>
    </div>
  );
}

export default About;
