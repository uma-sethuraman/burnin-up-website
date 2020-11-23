import React from "react";
import { GroupMember} from "./AboutInterfaces";
import AboutCard from "./AboutCard";

export default function AboutCarousel(props:any) {
 
  return ( 
    <div className="row">
    {props.members.map((member:GroupMember) => (
      <div className="about-member-columns" key={member.key}>
        <AboutCard member={member} />
      </div>
    ))}
    </div>
    );
}