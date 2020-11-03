import React from 'react';
import './Marker.css';

/* map marker component */
const Marker = (props: any) => {
    const { color, name } = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <br />
        <div className="pulse" />
      </div>
    );
  };

  export default Marker;