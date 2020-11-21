import React from "react";
import Navbar from "./OurNavbar";
import "./Invalid.css";
import WebFont from "webfontloader";

/* page for 404 errors */
function Invalid() {
  WebFont.load({
    google: {
      families: ["serif", "Staatliches", "sans-serif", "Raleway"],
    },
  });
  return (
    <div className="Invalid">
      <Navbar />
      <div className="Invalid-body">
        <div className="h3_invalid">
          <h3 className="h3_invalid">404</h3>
          <h1>Page not found.</h1>
        </div>
      </div>
    </div>
  );
}

export default Invalid;
