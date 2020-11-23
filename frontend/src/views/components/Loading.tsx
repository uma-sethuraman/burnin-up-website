import React from "react";
import "./Loading.css";
import Image from "react-bootstrap/Image";


/* page for loading */
function Loading() {
  return (
    <div>
        <div className="Loading-header"> 
            <div className="Loading-p">
                <p>Loading...</p>
                <Image src={require("../../assets/WorldPeace.gif")}/>
            </div>
        </div>
    </div>
  );
}

export default Loading;
