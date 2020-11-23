import React from "react";
import "./LoadingSpinner.css";
import Image from "react-bootstrap/Image";

/* page for 404 errors */
function LoadingSpinner() {
  return (
    <div>
        <div className="LoadingSpinner-header"> 
            <Image src={require("../../assets/loading-dots.gif")}/>
        </div>
    </div>
  );
}

export default LoadingSpinner;