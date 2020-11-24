import React from "react";
import "./About.css";
import { Card } from "react-bootstrap";

function AboutToolSetCard(props: any) {
  return (
    <div className="col-auto mb-3">
      <a href={props.toolset.href}>
        <Card>
          <Card.Img variant="bottom" src={props.toolset.src}/>
          <Card.Footer> 
            <u>{props.toolset.caption}</u> <br/>
            {props.toolset.purpose}
          </Card.Footer>
        </Card>
      </a>
    </div>
  );
}
export default AboutToolSetCard;