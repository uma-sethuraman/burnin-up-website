import React from "react";
import Navbar from "./OurNavbar";
import "./Invalid.css";
function Invalid() {
  return (
    <div className="Invalid">
      <Navbar />
      <div className="Invalid-body">
        <div className="h3_invalid">
          <h3>404</h3>
          <h1>Page not found.</h1>
        </div>
      </div>
    </div>
  );
}

export default Invalid;
