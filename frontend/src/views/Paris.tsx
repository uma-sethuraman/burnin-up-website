import { Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import Table from "react-bootstrap/Table";

function Paris() {
    return (
        <div className="Paris">
            <Navbar />
            <header className="App-header">
                <h1>Paris, <Link to="/countries/France"> France</Link></h1> 
                <br />
                <Image src={require("../assets/paris-skyline.jpg")} fluid />
                <br />
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                        <tr>
                        <td>Population: </td>
                        <td>2.148 million</td>
                        </tr>
                        <tr>
                        <td>Time Zone: </td>
                        <td>Central European Summer Time (GMT +2)</td>
                        </tr>
                        <tr>
                        <td>Elevation: </td>
                        <td>115ft</td>
                        </tr>
                        <tr>
                        <td>Latitude: </td>
                        <td>48.8566</td>
                        </tr>
                        <tr>
                        <td>Longitude: </td>
                        <td>2.3522</td>
                        </tr>
                        <tr>
                        <td>Fire Hazard Index: </td>
                        <td>0.875</td>
                        </tr>
                        <tr>
                        <td>Air Quality Index per US EPA Standard: </td>
                        <td>57</td>
                        </tr>
                        <tr>
                        <td>Particulate Matter: </td>
                        <td>20.375 μg/m3</td>
                        </tr>
                        <tr>
                        <td>Ozone: </td>
                        <td>0.9375 ppb</td>
                        </tr>
                        <tr>
                        <td>Nitrogen Dioxide: </td>
                        <td>32.5 ppb</td>
                        </tr>
                        <tr>
                        <td>Carbon Monoxide: </td>
                        <td>0.4375 ppm</td>
                        </tr>
                        <tr>
                        <td>Sulfur Dioxide: </td>
                        <td>0.25 ppb</td>
                        </tr>
                        <tr>
                        <td>Health Concern Level Based On EPA Standard: </td>
                        <td>Moderate</td>
                        </tr>
                        <tr>
                        <td>ClimaCell Pollen Index for Trees: </td>
                        <td>0 Climacell Pollen Index</td>
                        </tr>
                        <tr>
                        <td>ClimaCell Pollen Index for Weeds: </td>
                        <td>0 Climacell Pollen Index</td>
                        </tr>
                        <tr>
                        <td>ClimaCell Pollen Index for Grass: </td>
                        <td>0 Climacell Pollen Index</td>
                        </tr>
                    </tbody>
                    </Table>
                <br />
                <Image src={require("../assets/paris-location.jpg")} fluid />
                <br />
                <Image src={require("../assets/paris-AQ.jpeg")} fluid />
            </header>
        </div>
    );
}

export default Paris;
