import React from "react";
import Navbar from "./components/OurNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";

let navbarColor: string = "black";

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
  navbarColor = pctScrolled > 10 ? 'dark' : 'black';
  console.log(pctScrolled + "% scrolled");
}

/* main page, displays landing page and navbar */
function App() {
  window.onscroll = function () {
    amountscrolled();
  };
  return (
    <div className="App">
      {/* props={{ color: 'white' }} */}
      <Navbar />

      <LandingPage />
    </div>
  );
}

export default App;
