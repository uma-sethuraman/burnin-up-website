import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import { GroupMember, Gitlab, CommitsInfo } from "./AboutInterfaces";

function AboutCard(props:any) {
    return(
        <div className="columnsAbout">
        <Card>
        <Card.Img variant="top" src={props.member.image} 
        height="250" width="250"/>
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
