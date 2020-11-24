import React from "react";
import "./About.css";
import { Card } from "react-bootstrap";

/* a card component to display info about
all group members */
function AboutCard(props: any) {
  return (
    <div className="col-sm d-flex">
      <Card>
        <a href={props.member.linkedin}>
          <Card.Img variant="top" src={props.member.image} />
        </a>
        <Card.Body>
          <a href={props.member.linkedin}>
            <Card.Title>
              <u>{props.member.name}</u>
            </Card.Title>
          </a>
          <Card.Text>{props.member.role}</Card.Text>
          <Card.Text>{props.member.bio}</Card.Text>
          <div className="row">
            <div className="columns">
              <Card.Text>
                Issues:
                <br />
                {props.member.issues}
              </Card.Text>
            </div>
            <div className="columns">
              <Card.Text>
                Commits:
                <br />
                {props.member.commits}
              </Card.Text>
            </div>
            <div className="columns">
              <Card.Text>
                {" "}
                Unit Tests:
                <br />
                {props.member.unittest}
              </Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default AboutCard;
