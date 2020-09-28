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
                    <Link to="/country/USA"> United States</Link>
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
