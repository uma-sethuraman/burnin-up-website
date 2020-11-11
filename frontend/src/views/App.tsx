import React from "react";
import OurNavbar from "./components/OurNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";
import {NavbarProps} from "./components/OurNavbar";

let navbarColor: string = "black";
let myProps: NavbarProps = {color: ""};

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

function amountscrolled() {
  var winheight =
    window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
  var docheight = getDocHeight();
  var scrollTop =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
  var trackLength = docheight - winheight;
  var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  navbarColor = pctScrolled > 10 ? "white" : "black";
  myProps.color = navbarColor;
  console.log(pctScrolled + "% scrolled");
  console.log("NAVBAR NOW: " + navbarColor);
}

/* main page, displays landing page and navbar */
function App() {
  window.onscroll = function () {
    amountscrolled();
  };
  return (
    <div className="App">
      <OurNavbar color={navbarColor}/>

      <LandingPage />
    </div>
  );
}

export default App;
