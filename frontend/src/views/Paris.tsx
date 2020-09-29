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
                <h1>Paris, France</h1> 
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
                    </tbody>
                    </Table>
                <Image src={require("../assets/paris-skyline.jpg")} fluid />
                <br />
                <Image src={require("../assets/paris-location.jpg")} fluid />
                <br />
                <Image src={require("../assets/paris-AQ.jpeg")} fluid />
            </header>
        </div>
    );
}

export default Paris;