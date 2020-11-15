import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { CardDeck } from "react-bootstrap";
import { GroupMember, Gitlab, CommitsInfo } from "./AboutInterfaces";
import Image from "react-bootstrap/Image";
import AboutCard from "./AboutCard";


export default function AboutCarousel(props:any) {
    return (
    <div className="row">
      {props.members.map((member:GroupMember) => (
        
        <AboutCard member={member}/>

      ))};
    </div>
      //   <div className="row">
      //   <div className="h2_about">
      //     <div className="columnsAbout">
      //       <Image src={props.members[0].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[0].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[0].issues}</p>
      //       <p>Commits: {props.members[0].commits}</p>
      //       <p>Unit Tests: {props.members[0].unittest}</p>

      //       <p>
      //       {props.members[0].bio}
      //       </p>
      //     </div>
      //     <div className="columnsAbout">
      //       <Image src={props.members[1].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[1].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[1].issues}</p>
      //       <p>Commits: {props.members[1].commits}</p>
      //       <p>Unit Tests: {props.members[1].unittest}</p>
      //       <p>
      //         {props.members[1].bio}
      //       </p>
      //     </div>
      //     <div className="columnsAbout">
      //       <Image src={props.members[2].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[2].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[2].issues}</p>
      //       <p>Commits: {props.members[2].commits}</p>
      //       <p>Unit Tests: {props.members[2].unittest}</p>

      //       <p>
      //       {props.members[2].bio}{" "}
      //       </p>
      //     </div>
      //     <div className="columnsAbout">
      //       <Image src={props.members[3].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[3].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[3].issues}</p>
      //       <p>Commits: {props.members[3].commits}</p>
      //       <p>Unit Tests: {props.members[3].unittest}</p>
      //       <p>
      //       {props.members[3].bio}
      //       </p>
      //     </div>
      //     <div className="columnsAbout">
      //       <Image src={props.members[4].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[4].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[4].issues}</p>
      //       <p>Commits: {props.members[4].commits}</p>
      //       <p>Unit Tests: {props.members[4].unittest}</p>
      //       <p>
      //       {props.members[4].bio}
      //       </p>
      //     </div>
      //     <div className="columnsAbout">
      //       <Image src={props.members[5].image} height="250" roundedCircle />
      //       <h2>
      //         <b>{props.members[5].name}</b>
      //       </h2>
      //       <p>Issues: {props.members[5].issues}</p>
      //       <p>Commits: {props.members[5].commits}</p>
      //       <p>Unit Tests: {props.members[5].unittest}</p>
      //       <p>{props.members[5].bio}</p>
      //     </div>
      //   </div>
      // </div>
        // <div className="carousel-wrapper">
        //     <Carousel infiniteLoop useKeyboardArrows autoPlay>
            
        //         //map the cards in here
        //         <div>
        //         <CardDeck>
        //             <img src="../img-02.jpg" />

        //         </CardDeck>
        //         </div>
        //         <div>
        //             <img src="../img-03.jpg" />
        //         </div>

        //     </Carousel>
        // </div>
    );
}