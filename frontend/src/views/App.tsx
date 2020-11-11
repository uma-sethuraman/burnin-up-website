import React from "react";
import OurNavbar from "./components/OurNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";
import {NavbarProps} from "./components/OurNavbar";
import {useState} from 'react';

/* main page, displays landing page and navbar */
function App() {
  const [navbarColor, setNavbarColor] = useState<string>("black");

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
  // while (true) {
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
  // setNavbarColor(// vbarColor = pctScrolled > 10 ? "white" : "black";
 
  setNavbarColor(pctScrolled > 10 ? "white" : "black"); // Props.color = navbarColor;
  console.log(pctScrolled + "% scrolled");
  console.log("NAVBAR NOW: " + navbarColor);
}

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
