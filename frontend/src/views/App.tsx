import React from "react";
import OurNavbar from "./components/OurNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";

/* main page, displays landing page and navbar */
function App() {

return (  
  <div className="App">
     <OurNavbar />    
     <LandingPage />
  </div>
); 
}

export default App;
