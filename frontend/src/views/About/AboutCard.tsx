import React from "react";
import "./About.css";
import { Card, CardDeck } from "react-bootstrap";
import { GroupMember, Gitlab, CommitsInfo } from "./AboutInterfaces";

function AboutCard(props:any) {
    return(
        <div className="col-sm d-flex">
        <Card>
        <div className="columnsImage">
            <Card.Img variant="top" src={props.member.image} />
        </div>
        <Card.Body>
            <Card.Title>{props.member.name}</Card.Title>
            <Card.Text>{props.member.bio}</Card.Text>
            <Card.Text>Issues: {props.member.issues}</Card.Text>
            <Card.Text>Commits: {props.member.commits}</Card.Text>
           <Card.Text> Unit Tests: {props.member.unittest}</Card.Text>
        </Card.Body>
        </Card>
        </div>
       
    );
}
export default AboutCard;
