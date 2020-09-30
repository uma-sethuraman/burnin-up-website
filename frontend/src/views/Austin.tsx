import { Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import Table from "react-bootstrap/Table";

function Austin() {
    return (
        <div className="Austin">
            <Navbar />
            <header className="App-header">
                <h1>Austin, Texas, 
                    <Link to="/countries/USA"> United States</Link>
                </h1> 
                <br />
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                        <tr>
                        <td>Population: </td>
                        <td>964,254</td>
                        </tr>
                        <tr>
                        <td>Time Zone: </td>
                        <td>Central Daylight Time (GMT -5)</td>
                        </tr>
                        <tr>
                        <td>Elevation: </td>
                        <td>425ft</td>
                        </tr>
                        <tr>
                        <td>Latitude: </td>
                        <td>39.9042</td>
                        </tr>
                        <tr>
                        <td>Longitude: </td>
                        <td>116.4074</td>
                        </tr>
                        <tr>
                        <td>Fire Hazard Index: </td>
                        <td>5.375</td>
                        </tr>
                        <tr>
                        <td>Air Quality Index per US EPA Standard: </td>
                        <td>41.3125</td>
                        </tr>
                        <tr>
                        <td>Particulate Matter: </td>
                        <td>13.3125 μg/m3</td>
                        </tr>
                        <tr>
                        <td>Ozone: </td>
                        <td>1.1875 ppb</td>
                        </tr>
                        <tr>
                        <td>Nitrogen Dioxide: </td>
                        <td>19.0625 ppb</td>
                        </tr>
                        <tr>
                        <td>Carbon Monoxide: </td>
                        <td>5.1875 ppm</td>
                        </tr>
                        <tr>
                        <td>Sulfur Dioxide: </td>
                        <td>5.875 ppb</td>
                        </tr>
                        <tr>
                        <td>Health Concern Level Based On EPA Standard: </td>
                        <td>Good</td>
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
                <Image src={require("../assets/austin-capitol.jpg")} fluid />
                <br />
                <Image src={require("../assets/austin-location-map.jpg")} fluid />
                <br />
                <Image src={require("../assets/austin-OzoneGraph.jpg")} fluid />
            </header>
        </div>
    );
}

export default Austin;
