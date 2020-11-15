import React from "react";
import "./About.css";
import { Card, CardDeck } from "react-bootstrap";
import { GroupMember, Gitlab, CommitsInfo } from "./AboutInterfaces";

function AboutCard(props:any) {
    return(
        <div className="col-sm d-flex">
        <Card>
        <Card.Img variant="top" src={props.member.image} />
        <Card.Body>
            <Card.Title>{props.member.name}</Card.Title>
            <Card.Text>{props.member.bio}</Card.Text>
            <div className="row">
                <div className="columns">
                <Card.Text>Issues:<br/>{props.member.issues}</Card.Text>
                </div>
                <div className="columns">
                <Card.Text>Commits:<br/>{props.member.commits}</Card.Text>
                </div>
                <div className="columns">
                <Card.Text> Unit Tests:<br/>{props.member.unittest}</Card.Text>
                </div>
            </div>
          
        </Card.Body>
        </Card>
        </div>
       
    );
}
export default AboutCard;
