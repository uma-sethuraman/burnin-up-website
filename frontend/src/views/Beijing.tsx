import { Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import Table from "react-bootstrap/Table";

function Beijing() {
    return (
        <div className="Beijing">
            <Navbar />
            <header className="App-header">
                <h1>Beijing,
                    <Link to="/countries/China"> China</Link> </h1> 
                <br />
                <Image src={require("../assets/beijing-skyline.jpg")} fluid />
                <br />
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                        <tr>
                        <td>Population: </td>
                        <td>21.54 million</td>
                        </tr>
                        <tr>
                        <td>Time Zone: </td>
                        <td>China Standard Time (GMT + 8)</td>
                        </tr>
                        <tr>
                        <td>Elevation: </td>
                        <td>144ft</td>
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
                        <td>9.625</td>
                        </tr>
                        <tr>
                        <td>Air Quality Index per US EPA Standard: </td>
                        <td>56.6875</td>
                        </tr>
                        <tr>
                        <td>Particulate Matter: </td>
                        <td>14.8125 μg/m3</td>
                        </tr>
                        <tr>
                        <td>Ozone: </td>
                        <td>41.3125 ppb</td>
                        </tr>
                        <tr>
                        <td>Nitrogen Dioxide: </td>
                        <td>12.4375 ppb</td>
                        </tr>
                        <tr>
                        <td>Carbon Monoxide: </td>
                        <td>0.437 ppm</td>
                        </tr>
                        <tr>
                        <td>Sulfur Dioxide: </td>
                        <td>1.125 ppb</td>
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
                <Image src={require("../assets/beijing-location.gif")} fluid />
                <br />
                <Image src={require("../assets/beijing-AQ.jpg")} fluid />
            </header>
        </div>
    );
}

export default Beijing;
