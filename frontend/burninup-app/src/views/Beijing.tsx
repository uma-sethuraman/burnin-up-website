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
                <h1>Beijing, China</h1> 
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
                    </tbody>
                    </Table>
                <Image src={require("../assets/beijing-skyline.jpg")} fluid />
                <br />
                <Image src={require("../assets/beijing-location.gif")} fluid />
                <br />
                <Image src={require("../assets/beijing-AQ.jpg")} fluid />
            </header>
        </div>
    );
}

export default Beijing;