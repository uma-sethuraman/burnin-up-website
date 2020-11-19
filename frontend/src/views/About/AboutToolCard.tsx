import React from "react";
import "./About.css";
import { Card } from "react-bootstrap";

function AboutToolCard(props: any) {
  return (
    <div className="col-auto mb-3">
      <a href={props.tool.href}>
        <Card>
          <Card.Img variant="bottom" src={props.tool.src}/>
          <Card.Footer>{props.tool.caption}</Card.Footer>
        </Card>
      </a>
    </div>
  );
}
export default AboutToolCard;
