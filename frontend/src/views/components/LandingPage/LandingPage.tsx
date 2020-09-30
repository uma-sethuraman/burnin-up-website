import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image"; 
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="Landing">
            <header className="Landing-header">
                <div className="hook">
                <h3> Our world is burning up. </h3>
                <h2>it's "burning up, burning up for you baby." - Jonas Brothers </h2>
                </div>
            </header>
            <body className="Landing-body">
                <div className="explore">
                <h3 style={{ color: 'white' }}>Explore</h3>
                <div className="row">
                    <div className="column">
                    <Image src={require("../../../assets/austin-capitol.jpg")} height="250"/>
                    <Button variant="outline-light" href="/cities">Cities</Button>{' '}
                    </div>
                    <div className="column">
                    <Image src={require("../../../assets/beijing-skyline.jpg")} height="250"/>
                    <Button variant="outline-light" href="/countries">Countries</Button>{' '}
                    </div>
                    <div className="column">
                    <Image src={require("../../../assets/landing-bg.jpg")} height="250"/>
                    <Button variant="outline-light" href="/climateChange">Climate Change</Button>{' '}
                    </div>
                </div>
                </div>
            </body>
        </div>
    );
}

export default LandingPage;