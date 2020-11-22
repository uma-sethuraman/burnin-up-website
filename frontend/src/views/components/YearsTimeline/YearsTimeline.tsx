import React from 'react';
import { Link } from "react-router-dom";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

export default function YearsTimeline(props) {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <Link to={"/years/id=" + (props.year-10)}>
          <TimelineContent><u>{props.year-10}</u></TimelineContent>
        </Link>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <Link to={"/years/id=" + (props.year)}>
          <TimelineContent><u>{props.year}</u></TimelineContent>
        </Link>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <Link to={"/years/id=" + (props.year+10)}>
          <TimelineContent><u>{props.year+10}</u></TimelineContent>
        </Link>
      </TimelineItem>
    </Timeline>
  );
}
